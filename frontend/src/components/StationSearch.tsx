import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronDown, AlertCircle } from 'lucide-react';
import { searchStations, findStationByCode, type Station } from '../data/stations.ts';

interface StationSearchProps {
  /** Label displayed above the input */
  label: string;
  /** Current station code value */
  value: string;
  /** Called with the station code when a station is selected */
  onChange: (code: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Station code that is disabled / cannot be selected (to prevent same source & destination) */
  disabledCode?: string;
  /** Unique ID for accessibility */
  id: string;
}

export default function StationSearch({
  label,
  value,
  onChange,
  placeholder = 'Search station...',
  disabledCode,
  id,
}: StationSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [validationError, setValidationError] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Resolve the display text from the current code value
  const displayText = useMemo(() => {
    if (!value) return '';
    const station = findStationByCode(value);
    return station ? `${station.name} (${station.code})` : value;
  }, [value]);

  // Compute suggestions from query
  const suggestions = useMemo(() => {
    return searchStations(query, 8);
  }, [query]);

  // When value changes externally (e.g. swap), sync the query to show display text
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [value, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const selectStation = useCallback(
    (station: Station) => {
      if (disabledCode && station.code === disabledCode) {
        setValidationError('Source and Destination cannot be the same station.');
        setTimeout(() => setValidationError(''), 3000);
        return;
      }
      onChange(station.code);
      setQuery('');
      setIsOpen(false);
      setActiveIndex(-1);
      setValidationError('');
    },
    [onChange, disabledCode]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    setActiveIndex(-1);
    setValidationError('');

    // If user clears the input, clear the selected value too
    if (!val) {
      onChange('');
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    // Pre-populate query for searching when user focuses an already-selected field
    if (value && !query) {
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          selectStation(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const listboxId = `${id}-listbox`;

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label
        htmlFor={id}
        className="font-mono text-xs text-neutral-400 uppercase tracking-widest"
      >
        {label}
      </label>

      <div className="relative">
        {/* Station pin icon */}
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400/60 pointer-events-none" />

        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
          }
          autoComplete="off"
          value={isOpen ? query : displayText}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-neutral-950 border border-white/5 focus:border-cyan-400/60 text-neutral-100 pl-10 pr-10 py-3 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/20 rounded-lg transition-all placeholder:text-neutral-600"
        />

        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={`${label} suggestions`}
              initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="station-dropdown absolute z-50 top-full mt-1.5 left-0 w-full max-h-[280px] overflow-y-auto glass-panel rounded-xl border border-white/10 shadow-2xl py-1.5 origin-top"
            >
              {suggestions.map((station, idx) => {
                const isDisabled = disabledCode === station.code;
                const isActive = idx === activeIndex;

                return (
                  <li
                    key={`${station.code}-${idx}`}
                    id={`${id}-option-${idx}`}
                    role="option"
                    aria-selected={isActive}
                    aria-disabled={isDisabled}
                    onClick={() => !isDisabled && selectStation(station)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all text-sm ${
                      isDisabled
                        ? 'opacity-30 cursor-not-allowed'
                        : isActive
                        ? 'bg-indigo-500/15 text-neutral-100'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono text-xs text-cyan-400 font-bold w-12 flex-shrink-0">
                      {station.code}
                    </span>
                    <span className="truncate font-sans text-sm">{station.name}</span>
                    {isDisabled && (
                      <span className="ml-auto text-[10px] font-mono text-rose-400/70 flex-shrink-0">
                        SELECTED
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* No results hint */}
        <AnimatePresence>
          {isOpen && query.length > 0 && suggestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-1.5 left-0 w-full glass-panel rounded-xl border border-white/10 shadow-2xl p-4 text-center"
            >
              <p className="text-neutral-500 font-mono text-xs">
                No stations found for "{query}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Validation error */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] mt-0.5"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {validationError}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

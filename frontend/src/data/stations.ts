/**
 * Indian Railway Station Database
 * 200+ major stations covering all metros, state capitals, major junctions,
 * and high-traffic stations across India.
 */

export interface Station {
  name: string;
  code: string;
}

export const INDIAN_STATIONS: Station[] = [
  // --- A ---
  { name: "Agartala", code: "AGTL" },
  { name: "Agra Cantt", code: "AGC" },
  { name: "Agra Fort", code: "AF" },
  { name: "Ahmedabad Junction", code: "ADI" },
  { name: "Ajmer Junction", code: "AII" },
  { name: "Akola Junction", code: "AK" },
  { name: "Aliganj", code: "ALJ" },
  { name: "Aligarh Junction", code: "ALJN" },
  { name: "Allahabad Junction (Prayagraj)", code: "ALD" },
  { name: "Alwar", code: "AWR" },
  { name: "Ambala Cantt Junction", code: "UMB" },
  { name: "Amritsar Junction", code: "ASR" },
  { name: "Anand Junction", code: "ANND" },
  { name: "Anand Vihar Terminal", code: "ANVT" },
  { name: "Asansol Junction", code: "ASN" },
  { name: "Aurangabad", code: "AWB" },
  // --- B ---
  { name: "Balharshah Junction", code: "BPQ" },
  { name: "Bangalore City Junction (Bengaluru)", code: "SBC" },
  { name: "Bangalore Cantt", code: "BNC" },
  { name: "Bankura", code: "BQA" },
  { name: "Bareilly Junction", code: "BE" },
  { name: "Barmer", code: "BME" },
  { name: "Beed", code: "BEED" },
  { name: "Belgaum (Belagavi)", code: "BGM" },
  { name: "Bellary Junction", code: "BAY" },
  { name: "Bhopal Junction", code: "BPL" },
  { name: "Bhubaneswar", code: "BBS" },
  { name: "Bhuj", code: "BHUJ" },
  { name: "Bikaner Junction", code: "BKN" },
  { name: "Bilaspur Junction", code: "BSP" },
  { name: "Bokaro Steel City", code: "BKSC" },
  { name: "Mumbai Central", code: "BCT" },
  { name: "Mumbai CSMT (Chhatrapati Shivaji Maharaj Terminus)", code: "CSMT" },
  { name: "Mumbai Bandra Terminus", code: "BDTS" },
  { name: "Mumbai Dadar", code: "DR" },
  { name: "Mumbai LTT (Lokmanya Tilak Terminus)", code: "LTT" },
  // --- C ---
  { name: "Calicut (Kozhikode)", code: "CLT" },
  { name: "Chandigarh", code: "CDG" },
  { name: "Chengalpattu Junction", code: "CGL" },
  { name: "Chennai Central", code: "MAS" },
  { name: "Chennai Egmore", code: "MS" },
  { name: "Coimbatore Junction", code: "CBE" },
  { name: "Cuttack Junction", code: "CTC" },
  // --- D ---
  { name: "Darbhanga Junction", code: "DBG" },
  { name: "Darjeeling", code: "DJ" },
  { name: "Daulatabad", code: "DLB" },
  { name: "Daund Junction", code: "DD" },
  { name: "Dehradun", code: "DDN" },
  { name: "Delhi Junction (Old Delhi)", code: "DLI" },
  { name: "Delhi Sarai Rohilla", code: "DEE" },
  { name: "Dhanbad Junction", code: "DHN" },
  { name: "Dharwad", code: "DWR" },
  { name: "Dibrugarh Town", code: "DBRG" },
  { name: "Dimapur", code: "DMV" },
  { name: "Durg Junction", code: "DURG" },
  { name: "Durgapur", code: "DGR" },
  // --- E ---
  { name: "Ernakulam Junction (Kochi)", code: "ERS" },
  { name: "Ernakulam Town", code: "ERN" },
  { name: "Erode Junction", code: "ED" },
  // --- F ---
  { name: "Faizabad Junction (Ayodhya)", code: "FD" },
  { name: "Faridabad", code: "FDB" },
  { name: "Firozpur Cantt Junction", code: "FZR" },
  // --- G ---
  { name: "Gandhidham Junction", code: "GIMB" },
  { name: "Gandhinagar Capital", code: "GNDC" },
  { name: "Gaya Junction", code: "GAYA" },
  { name: "Ghaziabad Junction", code: "GZB" },
  { name: "Goa (Madgaon Junction)", code: "MAO" },
  { name: "Goa Vasco da Gama", code: "VSG" },
  { name: "Gorakhpur Junction", code: "GKP" },
  { name: "Gulbarga (Kalaburagi)", code: "GR" },
  { name: "Guna Junction", code: "GUNA" },
  { name: "Guntur Junction", code: "GNT" },
  { name: "Guwahati", code: "GHY" },
  { name: "Gwalior Junction", code: "GWL" },
  // --- H ---
  { name: "Habibganj (Rani Kamlapati)", code: "HBJ" },
  { name: "Hajipur Junction", code: "HJP" },
  { name: "Haldwani", code: "HDW" },
  { name: "Haridwar Junction", code: "HW" },
  { name: "Hassan", code: "HAS" },
  { name: "Hazrat Nizamuddin", code: "NZM" },
  { name: "Hisar", code: "HSR" },
  { name: "Hospet Junction", code: "HPT" },
  { name: "Howrah Junction (Kolkata)", code: "HWH" },
  { name: "Hubli Junction", code: "UBL" },
  { name: "Hyderabad Deccan (Nampally)", code: "HYB" },
  // --- I ---
  { name: "Imphal", code: "IMFL" },
  { name: "Indore Junction", code: "INDB" },
  { name: "Itarsi Junction", code: "ET" },
  // --- J ---
  { name: "Jabalpur Junction", code: "JBP" },
  { name: "Jaipur Junction", code: "JP" },
  { name: "Jaisalmer", code: "JSM" },
  { name: "Jalandhar City Junction", code: "JUC" },
  { name: "Jalgaon Junction", code: "JL" },
  { name: "Jammu Tawi", code: "JAT" },
  { name: "Jamnagar", code: "JAM" },
  { name: "Jamshedpur (Tatanagar)", code: "TATA" },
  { name: "Jhansi Junction", code: "JHS" },
  { name: "Jodhpur Junction", code: "JU" },
  { name: "Jorhat Town", code: "JTTN" },
  { name: "Junagadh Junction", code: "JND" },
  // --- K ---
  { name: "Kakinada Town", code: "CCT" },
  { name: "Kalyan Junction", code: "KYN" },
  { name: "Kanpur Central", code: "CNB" },
  { name: "Kanyakumari", code: "CAPE" },
  { name: "Karimnagar", code: "KRMR" },
  { name: "Karnal", code: "KUN" },
  { name: "Kathmandu (Birgunj)", code: "BGU" },
  { name: "Katni Junction", code: "KTE" },
  { name: "Kazipet Junction", code: "KZJ" },
  { name: "Kharagpur Junction", code: "KGP" },
  { name: "Kochuveli", code: "KCVL" },
  { name: "Kolhapur CSMT", code: "KOP" },
  { name: "Kolkata Sealdah", code: "SDAH" },
  { name: "Kollam Junction", code: "QLN" },
  { name: "Kota Junction", code: "KOTA" },
  { name: "Kottayam", code: "KTYM" },
  { name: "Kozhikode (Calicut)", code: "CLT" },
  { name: "Kumbakonam", code: "KMU" },
  { name: "Kurla Junction", code: "CLA" },
  // --- L ---
  { name: "Latur", code: "LUR" },
  { name: "Lucknow Charbagh (NR)", code: "LKO" },
  { name: "Lucknow Junction (NER)", code: "LJN" },
  { name: "Ludhiana Junction", code: "LDH" },
  // --- M ---
  { name: "Madurai Junction", code: "MDU" },
  { name: "Mangalore Central", code: "MAQ" },
  { name: "Mangalore Junction", code: "MAJN" },
  { name: "Manmad Junction", code: "MMR" },
  { name: "Mathura Junction", code: "MTJ" },
  { name: "Meerut City", code: "MTC" },
  { name: "Miraj Junction", code: "MRJ" },
  { name: "Moradabad Junction", code: "MB" },
  { name: "Mughal Sarai (Pt Deen Dayal Upadhyaya Jn)", code: "DDU" },
  { name: "Muzaffarpur Junction", code: "MFP" },
  { name: "Mysore Junction (Mysuru)", code: "MYS" },
  // --- N ---
  { name: "Nadiad Junction", code: "ND" },
  { name: "Nagpur Junction", code: "NGP" },
  { name: "Nanded", code: "NED" },
  { name: "Nagercoil Junction", code: "NCJ" },
  { name: "Nashik Road", code: "NK" },
  { name: "Nellore", code: "NLR" },
  { name: "New Delhi", code: "NDLS" },
  { name: "New Jalpaiguri Junction", code: "NJP" },
  { name: "Nizamabad", code: "NZB" },
  // --- O ---
  { name: "Okha", code: "OKHA" },
  { name: "Ongole", code: "OGL" },
  // --- P ---
  { name: "Palakkad Junction", code: "PGT" },
  { name: "Panaji (Karmali)", code: "KRMI" },
  { name: "Panipat Junction", code: "PNP" },
  { name: "Patiala", code: "PTA" },
  { name: "Patna Junction", code: "PNBE" },
  { name: "Pondicherry (Puducherry)", code: "PDY" },
  { name: "Porbandar", code: "PBR" },
  { name: "Prayagraj Junction", code: "PRYJ" },
  { name: "Pune Junction", code: "PUNE" },
  { name: "Puri", code: "PURI" },
  { name: "Purulia Junction", code: "PRR" },
  // --- R ---
  { name: "Raipur Junction", code: "R" },
  { name: "Rajamundry", code: "RJY" },
  { name: "Rajahmundry", code: "RJY" },
  { name: "Rajkot Junction", code: "RJT" },
  { name: "Ramnagar", code: "RMR" },
  { name: "Ranchi Junction", code: "RNC" },
  { name: "Ratlam Junction", code: "RTM" },
  { name: "Raxaul Junction", code: "RXL" },
  { name: "Ratnagiri", code: "RN" },
  { name: "Rewa", code: "REWA" },
  { name: "Rohtak Junction", code: "ROK" },
  { name: "Roorkee", code: "RK" },
  { name: "Rourkela Junction", code: "ROU" },
  // --- S ---
  { name: "Sabarmati Junction", code: "SBI" },
  { name: "Saharanpur", code: "SRE" },
  { name: "Salem Junction", code: "SA" },
  { name: "Sambalpur Junction", code: "SBP" },
  { name: "Satna Junction", code: "STA" },
  { name: "Secunderabad Junction", code: "SC" },
  { name: "Shimla", code: "SML" },
  { name: "Sholapur (Solapur)", code: "SUR" },
  { name: "Shri Ganganagar", code: "SGNR" },
  { name: "Siliguri Junction", code: "SGUJ" },
  { name: "Sitapur Junction", code: "STP" },
  { name: "Solapur Junction", code: "SUR" },
  { name: "Srinagar (Budgam)", code: "BUDG" },
  { name: "Surat", code: "ST" },
  // --- T ---
  { name: "Tenali Junction", code: "TEL" },
  { name: "Tezpur", code: "TEZR" },
  { name: "Thanjavur Junction", code: "TJ" },
  { name: "Thane", code: "TNA" },
  { name: "Thiruvananthapuram Central (Trivandrum)", code: "TVC" },
  { name: "Thrissur", code: "TCR" },
  { name: "Tirunelveli Junction", code: "TEN" },
  { name: "Tirupati", code: "TPTY" },
  { name: "Tiruchirapalli Junction (Trichy)", code: "TPJ" },
  { name: "Tinsukia Junction", code: "NTSK" },
  { name: "Tumkur (Tumakuru)", code: "TK" },
  { name: "Udaipur City", code: "UDZ" },
  // --- U ---
  { name: "Ujjain Junction", code: "UJN" },
  { name: "Unnao Junction", code: "ON" },
  // --- V ---
  { name: "Vadodara Junction", code: "BRC" },
  { name: "Varanasi Junction", code: "BSB" },
  { name: "Vasco da Gama", code: "VSG" },
  { name: "Vellore Cantt", code: "VLR" },
  { name: "Vijayawada Junction", code: "BZA" },
  { name: "Visakhapatnam Junction (Vizag)", code: "VSKP" },
  { name: "Vizianagaram Junction", code: "VZM" },
  // --- W ---
  { name: "Warangal", code: "WL" },
  { name: "Wardha Junction", code: "WR" },
  // --- Y ---
  { name: "Yavatmal", code: "YTL" },
  { name: "Yesvantpur Junction", code: "YPR" },
];

/**
 * Search stations by partial name or code.
 * Returns stations where the query appears anywhere in the name or code (case-insensitive).
 * Results are ranked: exact code match first, then code-starts-with, then name matches.
 */
export function searchStations(query: string, limit: number = 8): Station[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const exactCode: Station[] = [];
  const codeStartsWith: Station[] = [];
  const nameMatch: Station[] = [];

  for (const station of INDIAN_STATIONS) {
    const codeLower = station.code.toLowerCase();
    const nameLower = station.name.toLowerCase();

    if (codeLower === q) {
      exactCode.push(station);
    } else if (codeLower.startsWith(q)) {
      codeStartsWith.push(station);
    } else if (nameLower.includes(q) || codeLower.includes(q)) {
      nameMatch.push(station);
    }
  }

  return [...exactCode, ...codeStartsWith, ...nameMatch].slice(0, limit);
}

/**
 * Find a station by its exact code.
 */
export function findStationByCode(code: string): Station | undefined {
  const upper = code.toUpperCase();
  return INDIAN_STATIONS.find((s) => s.code === upper);
}

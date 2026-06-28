from sklearn.ensemble import RandomForestRegressor
import numpy as np

# Mock Historical Data (Features: [Days Left, Current Waitlist, Is_Festival_Season])
# Target: Confirmation Probability Percentage
X = np.array([
    [30, 10, 0],  # 30 din baaki, WL 10, normal season -> High chance
    [2, 50, 1],   # 2 din baaki, WL 50, festival season -> Very low chance
    [15, 5, 0],   # 15 din baaki, WL 5, normal season -> High chance
    [10, 20, 1],  # 10 din baaki, WL 20, festival season -> Medium-low chance
    [5, 2, 0],    # 5 din baaki, WL 2, normal season -> High chance
    [20, 100, 1]  # 20 din baaki, WL 100, festival season -> Low chance
])

y = np.array([95.0, 5.0, 85.0, 40.0, 90.0, 15.0])

# Backend start hote hi yeh model train ho jayega
model = RandomForestRegressor(n_estimators=10, random_state=42)
model.fit(X, y)

def predict_confirmation(days_left: int, current_wl: int, is_festival: int):
    """
    User ki current ticket details ko model mein feed karke probability nikalta hai.
    """
    # Naye input ko numpy array mein convert kiya
    input_data = np.array([[days_left, current_wl, is_festival]])
    
    # Model se prediction nikalna
    probability = model.predict(input_data)[0]
    
    return round(probability, 2)
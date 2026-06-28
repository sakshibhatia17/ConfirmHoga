# Dummy Database: Ek train, uske raste ke stations, aur seats ki availability
# 1 ka matlab Seat Khali hai, 0 ka matlab Booked hai.

TRAIN_NETWORK = {
    12948: {
        "name": "ConfirmHoga Express",
        "route": ["ADI", "BRC", "RTM", "KOTA", "NDLS"],
        "seat_matrix": {
            # Berth 12: Ahmedabad se Vadodara (BRC) tak khali hai
            "Berth-12": {"ADI-BRC": 1, "BRC-RTM": 0, "RTM-KOTA": 1, "KOTA-NDLS": 1},
            # Berth 45: Vadodara (BRC) se aage khali hai
            "Berth-45": {"ADI-BRC": 0, "BRC-RTM": 1, "RTM-KOTA": 1, "KOTA-NDLS": 0},
        }
    }
}

def find_split_seat_jugaad(source: str, destination: str):
    """
    Yeh function check karega ki agar direct seat nahi hai, 
    toh kya intermediate station par seat badal kar kaam ban sakta hai.
    """
    solutions = []

    for train_no, info in TRAIN_NETWORK.items():
        route = info["route"]
        
        # Check agar dono stations is train ke raste mein aate hain
        if source in route and destination in route:
            source_idx = route.index(source)
            dest_idx = route.index(destination)
            
            # Beech ka ek junction station dhoondhte hain (Maan lo sirf 1 stop beech mein check kar rahe hain)
            for i in range(source_idx + 1, dest_idx):
                junction = route[i]
                
                # Check karte hain ki kya Berth-12 pehle leg mein khali hai, aur Berth-45 dusre leg mein?
                # (Asli app mein yeh logic bohot bada hoga, abhi hum simple if-else laga rahe hain)
                if junction == "BRC":
                    solutions.append({
                        "status": "Success",
                        "train_name": info["name"],
                        "message": f"Jugaad Mil Gaya! Aap {source} se {junction} tak Berth-12 par baithiye, fir {junction} se {destination} tak Berth-45 par switch kar lijiye."
                    })
                    
    if not solutions:
        return [{"status": "Failed", "message": "Koi split-seat route nahi mila."}]
        
    return solutions
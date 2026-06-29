from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.algorithms.router import find_split_seat_jugaad 
from app.ml.predictor import predict_confirmation  # ML wala import

app = FastAPI(title="ConfirmHoga Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "Active", 
        "message": "ConfirmHoga server ekdam badhiya chal raha hai!"
    }

@app.get("/api/find-jugaad")
def get_jugaad(source: str, destination: str):

    return {
        "trainName": "ConfirmHoga Express",
        "trainNumber": "12948",
        "totalDuration": "8h 15m",
        "successRate": 96,
        "segments": [
            {
                "id": "1",
                "from": source.upper(),
                "to": "BRC",
                "trainName": "ConfirmHoga Express",
                "trainNumber": "12948",
                "classType": "3A",
                "coach": "B2",
                "seat": "12",
                "status": "Confirmed",
                "statusLabel": "Seat 12"
            },
            {
                "id": "2",
                "from": "BRC",
                "to": destination.upper(),
                "trainName": "ConfirmHoga Express",
                "trainNumber": "12948",
                "classType": "3A",
                "coach": "B4",
                "seat": "45",
                "status": "Confirmed",
                "statusLabel": "Seat 45"
            }
        ],
        "aiStrategy": "Switch coaches at Vadodara (BRC) for maximum confirmation probability.",
        "savings": "Avoid WL and save nearly 2 hours.",
        "warnings": [
            "Change coach at Vadodara.",
            "Board second berth within 5 minutes."
        ]
    }
    return {
        "search_query": f"{source} to {destination}",
        "alternatives": result
    }

# Yeh hamara naya ML endpoint hai
@app.get("/api/predict-pnr")
def get_pnr_prediction(days_left: int, current_wl: int, is_festival: int = 0):
    prob = predict_confirmation(days_left, current_wl, is_festival)
    
    status_message = "Safe Zone" if prob > 70 else ("Risky" if prob > 40 else "Danger Zone")
    
    return {
        "days_left": days_left,
        "current_waitlist": current_wl,
        "is_festival_season": bool(is_festival),
        "confirmation_probability": f"{prob}%",
        "prediction_status": status_message
    }
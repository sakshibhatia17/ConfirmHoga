# 🚄 ConfirmHoga

**AI-Powered Rail Intelligence Engine**

ConfirmHoga is an AI-native rail transit engine that helps passengers improve their travel planning by predicting PNR confirmation chances and discovering split-seat (seat jugaad) opportunities when direct seats are unavailable.

---

## ✨ Features

### 🎯 PNR Confirmation Prediction

- Predicts ticket confirmation probability using Machine Learning.
- Returns:
  - Confirmation Probability (%)
  - Safe / Risky / Danger Status

---

### 🚆 Split Ticket (Seat Jugaad)

- Finds alternative seat combinations.
- Suggests seat switching at intermediate stations.
- Helps users travel even when direct seats are unavailable.

---

## 🛠️ Tech Stack

### Backend

- Python
- FastAPI
- Uvicorn

### Machine Learning

- Scikit-Learn
- Random Forest Regressor

### Frontend (In Progress)

- Next.js
- Tailwind CSS
- React

---

## 📁 Project Structure

```text
ConfirmHoga/

├── backend/
│   ├── app/
│   │   ├── algorithms/
│   │   ├── ml/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/sakshibhatia17/ConfirmHoga.git
```

Move inside project

```bash
cd ConfirmHoga
```

Backend setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

## 📡 API Endpoints

### Root

```
GET /
```

Returns backend status.

---

### Split Ticket Engine

```
GET /api/find-jugaad
```

Parameters

```
source
destination
```

---

### PNR Prediction

```
GET /api/predict-pnr
```

Parameters

```
days_left
current_wl
is_festival
```

---

## 🚀 Future Scope

- Real-time Indian Railways data integration
- Larger Machine Learning dataset
- Interactive dashboard
- AI Travel Assistant
- Smart recommendations
- Route visualization
- Live train status

---

## 👩‍💻 Author

**Sakshi Bhatia**

GitHub:

https://github.com/sakshibhatia17
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, timezone
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Yus Klussenbedrijf API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB — optioneel. Als niet ingesteld, werkt de site als demo.
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "yus_klussenbedrijf")
db = None

if MONGO_URL:
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        _client = AsyncIOMotorClient(MONGO_URL)
        db = _client[DB_NAME]
    except Exception:
        db = None


class OfferteRequest(BaseModel):
    naam: str
    email: EmailStr
    telefoon: str
    adres: Optional[str] = ""
    dienst: str
    omschrijving: str
    honeypot: Optional[str] = ""

    @field_validator("naam")
    @classmethod
    def naam_min_length(cls, v):
        if len(v.strip()) < 2:
            raise ValueError("Naam moet minimaal 2 tekens bevatten")
        return v.strip()

    @field_validator("telefoon")
    @classmethod
    def telefoon_format(cls, v):
        cleaned = v.replace(" ", "").replace("-", "").replace("+", "")
        if not cleaned.isdigit() or len(cleaned) < 9:
            raise ValueError("Vul een geldig telefoonnummer in")
        return v.strip()

    @field_validator("omschrijving")
    @classmethod
    def omschrijving_min_length(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Omschrijving moet minimaal 10 tekens bevatten")
        return v.strip()


class ContactRequest(BaseModel):
    naam: str
    email: EmailStr
    bericht: str
    honeypot: Optional[str] = ""

    @field_validator("naam")
    @classmethod
    def naam_min_length(cls, v):
        if len(v.strip()) < 2:
            raise ValueError("Naam moet minimaal 2 tekens bevatten")
        return v.strip()

    @field_validator("bericht")
    @classmethod
    def bericht_min_length(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Bericht moet minimaal 10 tekens bevatten")
        return v.strip()


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "service": "Yus Klussenbedrijf API",
        "database": "connected" if db is not None else "demo-mode"
    }


@app.post("/api/offerte")
async def submit_offerte(data: OfferteRequest):
    if data.honeypot:
        return {"success": True, "message": "Uw aanvraag is ontvangen."}

    if db is not None:
        try:
            doc = {
                "naam": data.naam,
                "email": data.email,
                "telefoon": data.telefoon,
                "adres": data.adres,
                "dienst": data.dienst,
                "omschrijving": data.omschrijving,
                "created_at": datetime.now(timezone.utc),
                "status": "nieuw",
            }
            await db.offerte_requests.insert_one(doc)
        except Exception:
            pass  # Demo mode: form werkt, opslaan mislukt stil

    return {
        "success": True,
        "message": "Uw offerte aanvraag is succesvol ontvangen. Wij nemen binnen 24 uur contact met u op."
    }


@app.post("/api/contact")
async def submit_contact(data: ContactRequest):
    if data.honeypot:
        return {"success": True, "message": "Bericht ontvangen."}

    if db is not None:
        try:
            doc = {
                "naam": data.naam,
                "email": data.email,
                "bericht": data.bericht,
                "created_at": datetime.now(timezone.utc),
                "status": "nieuw",
            }
            await db.contact_messages.insert_one(doc)
        except Exception:
            pass  # Demo mode: form werkt, opslaan mislukt stil

    return {
        "success": True,
        "message": "Uw bericht is ontvangen. Wij nemen zo spoedig mogelijk contact met u op."
    }

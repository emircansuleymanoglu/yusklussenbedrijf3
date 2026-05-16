import pytest
import requests
import os

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


class TestHealth:
    def test_health(self):
        r = requests.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        print("Health OK")


class TestOfferte:
    def test_submit_valid(self):
        payload = {
            "naam": "Test Gebruiker",
            "email": "test@example.com",
            "telefoon": "0612345678",
            "adres": "Teststraat 1",
            "dienst": "Schilderwerk",
            "omschrijving": "Ik wil graag een offerte voor schilderwerk."
        }
        r = requests.post(f"{BASE_URL}/api/offerte", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        print(f"Offerte response: {data['message']}")

    def test_submit_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/offerte", json={"naam": "X"})
        assert r.status_code == 422
        print("Validation error returned as expected")

    def test_submit_short_naam(self):
        payload = {
            "naam": "A",
            "email": "test@example.com",
            "telefoon": "0612345678",
            "dienst": "Schilderwerk",
            "omschrijving": "Ik wil graag een offerte."
        }
        r = requests.post(f"{BASE_URL}/api/offerte", json=payload)
        assert r.status_code == 422
        print("Short naam validation works")


class TestContact:
    def test_submit_valid(self):
        payload = {
            "naam": "Test Kontakt",
            "email": "kontakt@example.com",
            "bericht": "Dit is een testbericht voor contact."
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        print(f"Contact response: {data['message']}")

    def test_submit_missing_fields(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"naam": "Test"})
        assert r.status_code == 422
        print("Contact validation error returned as expected")

    def test_honeypot_ignored(self):
        payload = {
            "naam": "Bot",
            "email": "bot@example.com",
            "bericht": "Spam bericht hier.",
            "honeypot": "filled"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        print("Honeypot test passed")

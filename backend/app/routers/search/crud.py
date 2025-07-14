from . import models
from datetime import datetime
from sqlalchemy.orm import Session


def get_all_search_logs(db: Session):
    """Return all search logs in descending timestamp order."""
    return db.query(models.SearchLog).order_by(models.SearchLog.timestamp.desc()).all()

def get_search_logs_by_user(db: Session, user_id: int):
    """Return all search logs for a specific user in descending timestamp order."""
    return db.query(models.SearchLog).filter(models.SearchLog.user_id == user_id).order_by(models.SearchLog.timestamp.desc()).all()

def log_search(db: Session, user_id: int, keyword: str, match_count: int, decrypted: bool):
    log = models.SearchLog(
        user_id=user_id,
        keyword=keyword,
        match_count=match_count,
        decrypted=decrypted,
        timestamp=datetime.utcnow()
    )
    db.add(log)
    db.commit()
    return log

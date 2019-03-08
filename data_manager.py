import database_common
import bcrypt
import datetime


def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@database_common.connection_handler
def add_new_user(cursor, username, password):
    # registration_date = datetime.now().isoformat(timespec='seconds')
    cursor.execute("""
                    INSERT INTO users(username, password)
                    VALUES (%(username)s, %(password)s);
                    """, {'username': username, 'password': password})


@database_common.connection_handler
def get_password_by_user(cursor, username):
    cursor.execute("""
    SELECT password FROM users
    WHERE username = %(username)s;

    """, {"username": username})
    password = cursor.fetchone()
    return password

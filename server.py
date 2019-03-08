from flask import Flask,render_template, request, redirect, url_for,session,escape,flash
import data_manager,os



app = Flask(__name__)
app.secret_key = os.urandom(16)


def logged_user_info():
    if 'username' in session:
        logged_in = 'Logged in as %s' % escape(session['username'])
        return logged_in


@app.route('/logged_in', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form.get('username')
        plain_text_password = request.form.get("password")

        hashed_password = data_manager.get_password_by_user(session['username'])
        verify = data_manager.verify_password(plain_text_password, hashed_password["password"])
        if 'username' in session and verify:
            logged_in = 'Logged in as %s' % escape(session['username'])
            flash("Successful Login")
            return render_template("index.html", logged_in=logged_in, verify=verify)

        else:
            flash("Invalid Password or Username")
            return render_template("index.html", verify=verify)




@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration', methods=['GET','POST'])
def registration():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        hashed_password = data_manager.hash_password(password)
        data_manager.add_new_user(username, hashed_password)
        return redirect(url_for('index'))
    return render_template('registration.html')



if __name__ == '__main__':
    app.run(debug=True)

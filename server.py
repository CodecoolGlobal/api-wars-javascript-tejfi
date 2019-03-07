from flask import Flask,render_template, request, redirect, url_for
import data_manager

app = Flask(__name__)


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

The art of writing has been declined gradually as people are well became well accustomed to the ease of using smart devices and computers. This project aims to restore the joy of maintain a personal journal in a digital and much more secure way. Users are allowed to set a password for their account and access their account in a secure way from any device. The system is designed in such a way to give user the ease of writing from their environment of choice. Users are allowed to read their journals, so that they could relive the moments they have written about. This promotes writing among the user community. The main aim is to preserve the old art of journaling through the digital modern age and young generation.

Login Module
This module is for user login. The user will be able to login using the password they already set for their account. If the user doesn’t own a account they can create one with Signup Module

Signup Module
This module gets details from the user and signups the user’s account in the database. The user will have to define their own password to login to their accounts. Their passwords are stored in a hashed format.

Write Module
This module allows the user to enter a journal entry in their profile. The data is stored in a encrypted form to promote privacy of users.


Read Module
This module allows the user to read a journal entry in their profile. The data stored in a encrypted form is converted to readable form with a secret key.




Install the required packages

*express
*body-parser
*ejs
*mysql
*bcrypt
*express-session
*cookie-parser


How to Run:
-Open command prompt in the directory
-Type the command "node router.js"
-Open browser and type "http://localhost:8069/"

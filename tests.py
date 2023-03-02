import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class SeleniumTests(unittest.TestCase):
    # login variables used in tests
    username = "Luis Cruz"
    email = "luiscruz@gmail.com"
    password = "Sustainable Software Engineering is the best"
    # webpages used in tests
    main_page = "http://localhost:3000/"
    signup_page = main_page + "users/register/"
    login_page = main_page + "auth/login/"
    account_page = main_page + "users/profile/" + email + "/"
    article_page = main_page + "articles/new/"
    published_page = main_page + "articles/question-regarding-sustainable-software-engineering/"

    def setUp(self):
        # sets up webdriver, Chrome() can be replaced with any other common web brobwser
        co = Options()
        co.add_argument('--headless')
        self.driver = webdriver.Chrome(options=co)

    def test_h_publish_article(self):
        # connect and login
        driver = self.connect_driver(self.login_page)
        driver.find_element(By.ID, "user-Email").send_keys(self.email)
        driver.find_element(By.ID, "user-Password").send_keys(self.password)
        driver.find_element(By.XPATH, "//form[@id='user-form']/button").click()
        # click new article button
        driver.find_element(By.XPATH, "//a[@href='/articles/new/']").click()

        # fill in new article form
        driver.find_element(By.ID, "article-Title").send_keys("Question regarding Sustainable Software Engineering")
        driver.find_element(By.ID, "article-Description").send_keys("What is Sustainable Software Engineering?")
        driver.find_element(By.ID, "article-Body").send_keys(self.password)
        driver.find_element(By.ID, "article-Tags").send_keys("Question")

        driver.find_element(By.XPATH, "//form[@id='article-form']/button").click()
        # go to published article page
        driver = self.connect_driver(self.published_page)
        # check whether the article was published
        self.assertEqual(driver.current_url, self.published_page)

    def test_g_goto_article_page(self):
        # connect and login
        driver = self.connect_driver(self.login_page)
        driver.find_element(By.ID, "user-Email").send_keys(self.email)
        driver.find_element(By.ID, "user-Password").send_keys(self.password)
        driver.find_element(By.XPATH, "//form[@id='user-form']/button").click()

        # click new article button
        driver.find_element(By.XPATH, "//a[@href='/articles/new/']").click()
        # check whether we arrived at new article page
        self.assertEqual(driver.current_url, self.article_page)

    def test_f_goto_account_page(self):
        # connect and login
        driver = self.connect_driver(self.login_page)
        driver.find_element(By.ID, "user-Email").send_keys(self.email)
        driver.find_element(By.ID, "user-Password").send_keys(self.password)
        driver.find_element(By.XPATH, "//form[@id='user-form']/button").click()

        # click on profile
        driver.find_element(By.XPATH, "//a[@href='/users/profile/" + self.email + "/']").click()
        # check whether we arrived at the account page
        self.assertEqual(driver.current_url, self.account_page)

    def test_e_login_account(self):
        driver = self.connect_driver(self.login_page)
        # fill email and password data
        driver.find_element(By.ID, "user-Email").send_keys(self.email)
        driver.find_element(By.ID, "user-Password").send_keys(self.password)
        submit = driver.find_element(By.XPATH, "//form[@id='user-form']/button")
        submit.click()

        WebDriverWait(self.driver, 10).until(EC.staleness_of(submit))
        # check whether we successfully logged in
        self.assertEqual(driver.current_url, self.main_page)

    def test_d_create_account(self):
        driver = self.connect_driver(self.signup_page)
        self.assertEqual(driver.current_url, self.signup_page)

        # send data to new account form
        driver.find_element(By.ID, "user-Name").send_keys(self.username)
        driver.find_element(By.ID, "user-Email").send_keys(self.email)
        driver.find_element(By.ID, "user-Password").send_keys(self.password)

        submit = driver.find_element(By.XPATH, "//form[@id='user-form']/button[@type='submit']")
        # submit data
        submit.click()
        WebDriverWait(self.driver, 10).until(EC.staleness_of(submit))
        # check whether we successfully created a new account
        self.assertEqual(driver.current_url, self.main_page)

    def test_c_goto_signup_page(self):
        driver = self.connect_driver(self.main_page)
        # click sign up button
        driver.find_element(By.XPATH, "//a[@href='/users/register/']").click()
        # check whether we arrived at sign up page
        self.assertEqual(driver.current_url, self.signup_page)

    def test_b_goto_login_page(self):
        driver = self.connect_driver(self.main_page)
        # click on login button
        driver.find_element(By.XPATH, "//a[@href='/auth/login/']").click()
        # check whether we arrived at login page
        self.assertEqual(driver.current_url, self.login_page)

    def test_a_open_main_page(self):
        driver = self.connect_driver(self.main_page)
        # check whether we arrived at main page
        self.assertEqual("Buffalo - Gobuff Realworld Example App", driver.title)
        self.assertEqual(driver.current_url, self.main_page)

    def connect_driver(self, webpage):
        driver = self.driver
        # connects driver to given webpage
        driver.get(webpage)
        return driver

    def tearDown(self):
        # closes webdriver
        self.driver.close()


def start():
    unittest.main()
    
if __name__ == '__main__':
    # run selenium tests
    unittest.main()

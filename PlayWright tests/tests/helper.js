const loginWith = async(page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Log-in' }).click()
}

const create = async(page, title, url) => {
    await page.getByRole('button', { name: 'Create new blog' }).click()
    await page.getByTestId('title').fill('TestingBlog')
    await page.getByTestId('url').fill('https://tests.com/playwright')
    await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, create }
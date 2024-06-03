const { test, describe, expect, beforeEach } = require('@playwright/test')
const { PassThrough } = require('stream')
const { loginWith, create } = require('./helper')
const { log } = require('console')

describe('Blog app', () => {
    beforeEach(async({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: "Developer",
                username: "NewestDev",
                password: "Dev123"
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Initially, login form is shown', async({ page }) => {
        await expect(page.getByRole('button', { name: 'Log-in' } )).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
    })

    describe('Login', () => {
        test('Succeeds with right credentials', async({ page }) => {
            await loginWith(page, 'NewestDev', 'Dev123')
            await expect(page.getByText('Logged in as NewestDev')).toBeVisible()
        })

        test('Fails with wrong credentials', async({ page }) => {
            await loginWith(page, 'NotDev', 'A123')
            await expect(page.getByText('invalid username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'NewestDev', 'Dev123')
        })

        test('A new blog can be created', async({ page }) => {
            await create(page, 'TestingBlog', 'Tests.co.uk')

            const message = await page.locator('.error')
            expect(message).toContainText('A new blog TestingBlog by NewestDev was added')

            await expect(page.getByTestId('TestingBlog')).toBeVisible()
        })

        test('A blog can be liked', async({ page }) => {
            await create(page, 'TestingBlog', 'Tests.co.uk')

            const newBlogDiv = await page.getByTestId('TestingBlog')
            await newBlogDiv.getByRole('button', { name: 'Like'})

            const message = await page.locator('.error')
            expect(message).toContainText('Post liked!')
        })
    })

})
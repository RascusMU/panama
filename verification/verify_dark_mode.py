from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        url = "file://" + os.path.abspath("index.html")
        page.goto(url)

        # 1. Take screenshot of Light Mode (Default)
        page.screenshot(path="verification/light_mode.png", full_page=False)
        print("Captured light_mode.png")

        # 2. Click Toggle Button
        page.click("#theme-toggle")

        # Wait for transition
        page.wait_for_timeout(500)

        # 3. Take screenshot of Dark Mode
        page.screenshot(path="verification/dark_mode.png", full_page=False)
        print("Captured dark_mode.png")

        # 4. Verify data-theme attribute
        theme_attr = page.locator("html").get_attribute("data-theme")
        if theme_attr == "dark":
            print("SUCCESS: Theme attribute switched to 'dark'")
        else:
            print(f"FAILURE: Theme attribute is {theme_attr}")

        browser.close()

if __name__ == "__main__":
    run()

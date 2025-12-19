from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the index.html file directly
        # Since we are in the root of the repo, we can use absolute path
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Scroll to the gallery section
        page.locator("#galerie").scroll_into_view_if_needed()

        # Take a screenshot of the gallery section
        # We might need to wait for images to load if they are lazy loaded
        page.wait_for_timeout(2000) # Give some time for lazy loading and transitions

        page.screenshot(path="verification/gallery_redesign.png", full_page=True)

        # Also take a specific screenshot of the gallery section
        gallery_section = page.locator("#galerie")
        gallery_section.screenshot(path="verification/gallery_section.png")

        browser.close()

if __name__ == "__main__":
    run()

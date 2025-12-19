
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local index.html file
        page.goto(f"file://{os.getcwd()}/index.html")

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # We manually wait a bit
        page.wait_for_timeout(500)

        # Screenshot gallery
        page.locator("#galerie").screenshot(path="verification/gallery_final.png")
        print("Gallery screenshot saved")

        # Click first item
        page.locator(".gallery-item").first.click()

        # Manually wait for animation and DOM update
        page.wait_for_timeout(1000)

        # Screenshot lightbox
        # Ensure it is visible before screenshot
        if page.locator("#lightbox").is_visible():
             page.screenshot(path="verification/lightbox_final.png")
             print("Lightbox screenshot saved")
        else:
             print("Lightbox not visible")

        browser.close()

if __name__ == "__main__":
    run()

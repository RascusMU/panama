from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        url = "file://" + os.path.abspath("index.html")
        page.goto(url)

        # 1. Count visible gallery items initially
        visible_items = page.locator(".gallery-item:not(.hidden-gallery-item)").count()
        print(f"Initially visible items: {visible_items}")

        if visible_items != 8:
            print("FAILURE: Expected 8 visible items initially.")

        # 2. Click Load More
        btn = page.locator("#load-more-btn")
        if not btn.is_visible():
             print("FAILURE: Load more button not visible")

        btn.click()
        page.wait_for_timeout(1500) # Wait for staggered animation

        # 3. Count visible items after click
        # Note: The script removes the class, so we count all .gallery-item that are visible
        # We check if any still have display: none

        all_items = page.locator(".gallery-item").count()
        hidden_items = page.locator(".hidden-gallery-item").count()

        print(f"Total items: {all_items}")
        print(f"Hidden items remaining: {hidden_items}")

        if hidden_items == 0 and all_items > 8:
            print("SUCCESS: All items revealed.")
        else:
             print("FAILURE: Some items are still hidden.")

        # Screenshot result
        page.screenshot(path="verification/gallery_expanded.png", full_page=False)
        print("Screenshot saved to verification/gallery_expanded.png")

        browser.close()

if __name__ == "__main__":
    run()

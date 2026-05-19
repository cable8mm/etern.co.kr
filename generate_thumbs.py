import os
from PIL import Image, ImageDraw, ImageOps, ImageFilter, ImageFont

def create_museum_thumbnail(screenshot_path, output_path, title, subtitle, bg_color="#e9efe8"):
    # 1. Create a strict 16:10 high-resolution canvas
    canvas_w = 1280
    canvas_h = 800
    canvas = Image.new("RGBA", (canvas_w, canvas_h), bg_color)
    draw = ImageDraw.Draw(canvas)

    # 2. Load the screenshot
    if not os.path.exists(screenshot_path):
        print(f"Error: Screenshot not found at {screenshot_path}")
        return False
    
    screenshot = Image.open(screenshot_path).convert("RGBA")
    
    # 3. Calculate target dimensions for the web browser frame inside the canvas
    # Leave 80px margin at the top, left, right, and 120px at the bottom for metadata labels
    frame_max_w = canvas_w - 160 # 1120px
    frame_max_h = canvas_h - 220 # 580px
    
    # Keep screenshot aspect ratio
    ss_w, ss_h = screenshot.size
    ss_aspect = ss_w / ss_h
    
    # We want a standard browser window aspect ratio, say 16:10 or matching the screenshot
    target_w = frame_max_w
    target_h = int(target_w / ss_aspect)
    
    if target_h > frame_max_h:
        target_h = frame_max_h
        target_w = int(target_h * ss_aspect)
        
    # Resize screenshot
    screenshot_resized = screenshot.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 4. Create the browser window container (chrome bar + screenshot content)
    chrome_h = 32
    window_h = target_h + chrome_h
    window_w = target_w
    
    browser_win = Image.new("RGBA", (window_w, window_h), (0, 0, 0, 0))
    win_draw = ImageDraw.Draw(browser_win)
    
    # Draw rounded rectangle background for the whole window (so corners can be masked)
    corner_radius = 12
    
    # Draw browser chrome top bar (light gray)
    win_draw.rounded_rectangle(
        [0, 0, window_w, window_h],
        radius=corner_radius,
        fill=(255, 255, 255, 255),
        outline=(200, 200, 200, 255),
        width=1
    )
    
    # Fill the chrome header specifically
    win_draw.rounded_rectangle(
        [0, 0, window_w, chrome_h + 10],
        radius=corner_radius,
        fill=(235, 238, 235, 255)
    )
    # Draw flat rectangle to cover the bottom rounded corners of the top header
    win_draw.rectangle(
        [0, chrome_h, window_w, chrome_h + 10],
        fill=(235, 238, 235, 255)
    )
    # Draw separator line
    win_draw.line([0, chrome_h, window_w, chrome_h], fill=(200, 200, 200, 255), width=1)
    
    # Draw macOS-style window control dots (red, yellow, green) on the left
    dot_radius = 5
    dot_spacing = 16
    start_x = 18
    dot_y = chrome_h // 2
    
    # Red
    win_draw.ellipse([start_x - dot_radius, dot_y - dot_radius, start_x + dot_radius, dot_y + dot_radius], fill=(255, 95, 87, 255))
    # Yellow
    win_draw.ellipse([start_x + dot_spacing - dot_radius, dot_y - dot_radius, start_x + dot_spacing + dot_radius, dot_y + dot_radius], fill=(254, 188, 46, 255))
    # Green
    win_draw.ellipse([start_x + 2 * dot_spacing - dot_radius, dot_y - dot_radius, start_x + 2 * dot_spacing + dot_radius, dot_y + dot_radius], fill=(39, 203, 64, 255))
    
    # Paste screenshot content
    browser_win.paste(screenshot_resized, (0, chrome_h), screenshot_resized)
    
    # Apply rounded corner mask to the bottom as well
    mask = Image.new("L", (window_w, window_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, window_w, window_h], radius=corner_radius, fill=255)
    
    # 5. Create drop shadow for the browser window
    shadow_offset = (0, 8)
    shadow_blur = 20
    shadow_color = (0, 0, 0, 45) # Soft shadow
    
    shadow_w = window_w + shadow_blur * 2
    shadow_h = window_h + shadow_blur * 2
    shadow = Image.new("RGBA", (shadow_w, shadow_h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    
    s_draw.rounded_rectangle(
        [shadow_blur, shadow_blur, shadow_blur + window_w, shadow_blur + window_h],
        radius=corner_radius,
        fill=shadow_color
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
    
    # 6. Assemble shadow and window onto canvas
    win_x = (canvas_w - window_w) // 2
    win_y = (canvas_h - window_h - 40) // 2 # Centered with space for bottom label
    
    canvas.paste(shadow, (win_x - shadow_blur + shadow_offset[0], win_y - shadow_blur + shadow_offset[1]), shadow)
    canvas.paste(browser_win, (win_x, win_y), mask=mask)
    
    # 7. Draw Technical Metadata Plate/Label at the bottom
    # Load premium clean font (standard on macOS) or fallback
    font_path = "/System/Library/Fonts/Supplemental/Courier New.ttf"
    if not os.path.exists(font_path):
        font_path = "/System/Library/Fonts/Courier.dfont"
        
    font = None
    if os.path.exists(font_path):
        try:
            font = ImageFont.truetype(font_path, 15)
        except Exception:
            pass
            
    # Compile Technical Metadata String
    metadata_str = f"DIGITAL ARTIFACT: {title.upper()} / SYSTEM RECOVERY / {subtitle.upper()}"
    
    # Draw centered technical label
    text_y = canvas_h - 60
    if font:
        # Get text size
        text_bbox = draw.textbbox((0, 0), metadata_str, font=font)
        text_w = text_bbox[2] - text_bbox[0]
        text_x = (canvas_w - text_w) // 2
        
        # Subtle horizontal metadata line
        line_y = text_y - 12
        line_w = 400
        draw.line([(canvas_w - line_w) // 2, line_y, (canvas_w + line_w) // 2, line_y], fill=(180, 185, 180, 255), width=1)
        
        draw.text((text_x, text_y), metadata_str, fill=(80, 85, 80, 255), font=font)
    else:
        # Fallback text drawing
        draw.text((canvas_w // 2 - 200, text_y), metadata_str, fill=(80, 85, 80, 255))
        
    # 8. Save output
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.convert("RGB").save(output_path, "PNG")
    print(f"Success: Beautiful museum thumbnail created at {output_path}")
    return True

# Process projects
create_museum_thumbnail(
    "docs/projects/assets/aki-in-screenshot.png",
    "public/images/aki-in-thumb.png",
    "Aki-In Music Marketplace",
    "Revival Ver 2024 / Code Base: PHP 8.2 & CakePHP 2",
    bg_color="#e9efe8"
)

create_museum_thumbnail(
    "docs/projects/assets/tanz-station-screenshot.png",
    "public/images/tanz-station-thumb.png",
    "Seoul Tanz Station Scheduler",
    "Revival Ver 2022 / Code Base: PHP 7.2 & CakePHP 2",
    bg_color="#f5f7f4"
)

create_museum_thumbnail(
    "docs/projects/assets/palgle-screenshot.png",
    "public/images/palgle-thumb.png",
    "Palgle WordPress Blog",
    "Revival Ver 2024 / Code Base: Jekyll & Markdown",
    bg_color="#e9efe8"
)

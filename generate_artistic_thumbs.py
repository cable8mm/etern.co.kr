import os
import math
from PIL import Image, ImageDraw, ImageOps, ImageFilter, ImageFont

def get_font(font_name, size):
    # Standard macOS font paths
    paths = [
        f"/System/Library/Fonts/Supplemental/{font_name}.ttf",
        f"/System/Library/Fonts/Supplemental/{font_name}.ttc",
        f"/System/Library/Fonts/{font_name}.ttf",
        f"/System/Library/Fonts/{font_name}.ttc",
        f"/Library/Fonts/{font_name}.ttf",
    ]
    for path in paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return None

def create_noise_texture(width, height, base_color, noise_opacity=0.08):
    # Generates a procedural parchment/paper texture
    img = Image.new("RGBA", (width, height), base_color)
    draw = ImageDraw.Draw(img)
    import random
    # Create subtle grain
    for _ in range(int(width * height * 0.15)):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        # Random brightness deviation
        dev = random.randint(-15, 15)
        r, g, b, a = base_color
        nr = max(0, min(255, r + dev))
        ng = max(0, min(255, g + dev))
        nb = max(0, min(255, b + dev))
        # Draw single pixel dot
        draw.point((x, y), fill=(nr, ng, nb, int(255 * noise_opacity)))
    return img

def apply_sepia_filter(image, intensity=0.7):
    # Converts an image to a gorgeous warm sepia tone
    r, g, b, a = image.split()
    r_data = r.load()
    g_data = g.load()
    b_data = b.load()
    
    w, h = image.size
    for y in range(h):
        for x in range(w):
            pv_r = r_data[x, y]
            pv_g = g_data[x, y]
            pv_b = b_data[x, y]
            
            # Sepia formula
            tr = int(pv_r * 0.393 + pv_g * 0.769 + pv_b * 0.189)
            tg = int(pv_r * 0.349 + pv_g * 0.686 + pv_b * 0.168)
            tb = int(pv_r * 0.272 + pv_g * 0.534 + pv_b * 0.131)
            
            # Clamping
            tr = min(255, tr)
            tg = min(255, tg)
            tb = min(255, tb)
            
            # Blend based on intensity
            r_data[x, y] = int(pv_r * (1 - intensity) + tr * intensity)
            g_data[x, y] = int(pv_g * (1 - intensity) + tg * intensity)
            b_data[x, y] = int(pv_b * (1 - intensity) + tb * intensity)
            
    return Image.merge("RGBA", (r, g, b, a))

def draw_vignette(image, color=(0, 0, 0, 180), factor=0.75):
    # Adds a gorgeous vignette spotlight wash to the canvas
    w, h = image.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    o_draw = ImageDraw.Draw(overlay)
    
    cx, cy = w // 2, h // 2
    max_d = math.sqrt(cx**2 + cy**2)
    
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx**2 + dy**2)
            ratio = dist / max_d
            if ratio > factor:
                alpha = int(color[3] * ((ratio - factor) / (1 - factor)))
                alpha = min(color[3], max(0, alpha))
                o_draw.rectangle([x, y, x+2, y+2], fill=(color[0], color[1], color[2], alpha))
                
    return Image.alpha_composite(image, overlay)

# =====================================================================
# 1. AKI-IN: Classic European Luxury Gallery Gilded Frame Composition
# =====================================================================
def make_aki_in_gallery():
    print("🎨 Creating Aki-In Gallery Thumbnail...")
    canvas_w, canvas_h = 1280, 800
    
    # Base: Rich royal burgundy museum wall
    canvas = create_noise_texture(canvas_w, canvas_h, (94, 20, 26, 255), noise_opacity=0.12)
    canvas = draw_vignette(canvas, color=(20, 3, 5, 230), factor=0.45) # Deep spotlight vignette
    draw = ImageDraw.Draw(canvas)
    
    # Load screenshot
    ss = Image.open("docs/projects/assets/aki-in-screenshot.png").convert("RGBA")
    
    # Warm sepia gallery lighting effect on screenshot
    ss = apply_sepia_filter(ss, intensity=0.55)
    
    # Target size inside frame
    inner_w, inner_h = 750, 469
    ss_resized = ss.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    # Frame thickness
    frame_outer_w = inner_w + 64
    frame_outer_h = inner_h + 64
    
    # Position
    fx = (canvas_w - frame_outer_w) // 2
    fy = (canvas_h - frame_outer_h - 40) // 2
    
    # Generate gilded gold frame
    frame = Image.new("RGBA", (frame_outer_w, frame_outer_h), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame)
    
    # Multilayered Gilded Gold Rectangles
    # Dark shadow border
    f_draw.rectangle([0, 0, frame_outer_w, frame_outer_h], fill=(45, 30, 10, 255))
    # Bronze outer frame
    f_draw.rectangle([4, 4, frame_outer_w-4, frame_outer_h-4], fill=(139, 105, 30, 255))
    # Shiny Gold accent
    f_draw.rectangle([12, 12, frame_outer_w-12, frame_outer_h-12], fill=(218, 165, 32, 255))
    # Carved dark bevel
    f_draw.rectangle([20, 20, frame_outer_w-20, frame_outer_h-20], fill=(85, 60, 15, 255))
    # Golden inner fillet
    f_draw.rectangle([28, 28, frame_outer_w-28, frame_outer_h-28], fill=(255, 215, 0, 255))
    # Matte black inner fillet
    f_draw.rectangle([30, 30, frame_outer_w-30, frame_outer_h-30], fill=(15, 15, 15, 255))
    
    # Paste screenshot inside frame
    frame.paste(ss_resized, (32, 32))
    
    # Add subtle inner frame shadow
    inner_shadow = Image.new("RGBA", (inner_w, inner_h), (0, 0, 0, 0))
    is_draw = ImageDraw.Draw(inner_shadow)
    is_draw.rectangle([0, 0, inner_w, inner_h], outline=(0, 0, 0, 160), width=6)
    inner_shadow = inner_shadow.filter(ImageFilter.GaussianBlur(6))
    frame.paste(inner_shadow, (32, 32), inner_shadow)
    
    # Shadow for the whole frame
    shadow = Image.new("RGBA", (frame_outer_w + 40, frame_outer_h + 40), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([20, 20, 20 + frame_outer_w, 20 + frame_outer_h], fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    
    # Composite onto canvas
    canvas.paste(shadow, (fx - 20, fy - 20 + 8), shadow)
    canvas.paste(frame, (fx, fy), frame)
    
    # Draw Brass plaque/label below the frame
    plaque_w, plaque_h = 320, 52
    px = (canvas_w - plaque_w) // 2
    py = fy + frame_outer_h + 16
    
    # Brass plaque gradient color styling
    draw.rectangle([px, py, px + plaque_w, py + plaque_h], fill=(160, 125, 45, 255), outline=(90, 70, 20, 255), width=2)
    draw.rectangle([px+2, py+2, px + plaque_w-2, py + plaque_h-2], fill=(212, 175, 55, 255))
    # Brass rivets
    draw.ellipse([px+6, py+plaque_h//2-3, px+12, py+plaque_h//2+3], fill=(80, 60, 15, 255))
    draw.ellipse([px+plaque_w-12, py+plaque_h//2-3, px+plaque_w-6, py+plaque_h//2+3], fill=(80, 60, 15, 255))
    
    # Draw classical typography on the brass plaque
    font = get_font("Georgia", 13)
    if not font:
        font = get_font("Times New Roman", 13)
        
    plaque_text_1 = "AKI-IN MUSIC GALLERY"
    plaque_text_2 = "REVIVED SYSTEM / EST. 2016 - 2024"
    
    if font:
        # Plaque text 1
        bbox1 = draw.textbbox((0, 0), plaque_text_1, font=font)
        pw1 = bbox1[2] - bbox1[0]
        draw.text((px + (plaque_w - pw1)//2, py + 8), plaque_text_1, fill=(40, 30, 5, 255), font=font)
        
        # Plaque text 2
        font_sub = get_font("Georgia", 10) or get_font("Times New Roman", 10)
        bbox2 = draw.textbbox((0, 0), plaque_text_2, font=font_sub)
        pw2 = bbox2[2] - bbox2[0]
        draw.text((px + (plaque_w - pw2)//2, py + 28), plaque_text_2, fill=(60, 45, 10, 255), font=font_sub)
    else:
        draw.text((px + 20, py + 12), plaque_text_1, fill=(40, 30, 5, 255))
        
    canvas.convert("RGB").save("public/images/aki-in-thumb.png", "PNG")
    print("Success: Gilded museum gallery thumbnail created for Aki-In.")

# =====================================================================
# 2. PALGLE: 10-Year Old Blog, Carved Woodblock & Handmade Hanji Paper
# =====================================================================
def make_palgle_woodblock():
    print("🎨 Creating Palgle Woodblock Thumbnail...")
    canvas_w, canvas_h = 1280, 800
    
    # Base: Aged, warm textured Korean Hanji paper background
    canvas = create_noise_texture(canvas_w, canvas_h, (238, 230, 212, 255), noise_opacity=0.18)
    canvas = draw_vignette(canvas, color=(160, 140, 100, 110), factor=0.5) # Warm vignette
    draw = ImageDraw.Draw(canvas)
    
    # Load screenshot
    ss = Image.open("docs/projects/assets/palgle-screenshot.png").convert("RGBA")
    
    # Resize screenshot to fit woodblock frame
    inner_w, inner_h = 740, 462
    ss_resized = ss.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    # Apply a high-contrast distressed pressed ink filter to the screenshot
    # We turn it into a beautiful grayscale pressed ink woodblock snapshot
    ss_gray = ss_resized.convert("L")
    ss_ink = ImageOps.colorize(ss_gray, black=(24, 24, 28), white=(238, 230, 212))
    ss_ink = ss_ink.convert("RGBA")
    
    # Position
    frame_outer_w = inner_w + 48
    frame_outer_h = inner_h + 48
    fx = (canvas_w - frame_outer_w) // 2
    fy = (canvas_h - frame_outer_h - 40) // 2
    
    # Generate carved woodblock frame (dark burnt charcoal wood grain feel)
    frame = Image.new("RGBA", (frame_outer_w, frame_outer_h), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame)
    
    # Burnt rustic charcoal woodblock frame
    f_draw.rectangle([0, 0, frame_outer_w, frame_outer_h], fill=(36, 30, 26, 255))
    f_draw.rectangle([8, 8, frame_outer_w-8, frame_outer_h-8], fill=(16, 12, 10, 255))
    # Carved border line
    f_draw.rectangle([16, 16, frame_outer_w-16, frame_outer_h-16], fill=(50, 42, 36, 255))
    f_draw.rectangle([20, 20, frame_outer_w-20, frame_outer_h-20], fill=(238, 230, 212, 255)) # Paper base inside
    
    # Paste distressed ink screenshot
    frame.paste(ss_ink, (24, 24))
    
    # Overlay subtle carved texture lines
    for i in range(24, frame_outer_h - 24, 8):
        f_draw.line([24, i, frame_outer_w-24, i], fill=(24, 24, 28, 12), width=1)
        
    # Draw woodblock text overlays or pressed marks on the wood frame
    # Subtle stamped look
    shadow = Image.new("RGBA", (frame_outer_w + 16, frame_outer_h + 16), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([8, 8, 8 + frame_outer_w, 8 + frame_outer_h], fill=(30, 25, 20, 75))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    
    # Paste onto canvas
    canvas.paste(shadow, (fx - 8, fy - 8 + 4), shadow)
    canvas.paste(frame, (fx, fy), frame)
    
    # Draw a prominent red pressed stamp/seal (낙관) on the right corner of the frame
    stamp_w, stamp_h = 60, 60
    sx = fx + frame_outer_w - 40
    sy = fy + frame_outer_h - 40
    
    stamp = Image.new("RGBA", (stamp_w, stamp_h), (0, 0, 0, 0))
    st_draw = ImageDraw.Draw(stamp)
    st_draw.rectangle([0, 0, stamp_w, stamp_h], outline=(180, 30, 30, 220), width=3)
    
    font_stamp = get_font("Georgia", 11)
    if font_stamp:
        st_draw.text((8, 14), "팔글", fill=(180, 30, 30, 220), font=font_stamp)
        st_draw.text((8, 30), "복원", fill=(180, 30, 30, 220), font=font_stamp)
    else:
        st_draw.text((12, 22), "PALGLE", fill=(180, 30, 30, 220))
        
    # Apply high-contrast distressed mask to the stamp
    stamp = stamp.filter(ImageFilter.GaussianBlur(1))
    canvas.paste(stamp, (sx, sy), stamp)
    
    # Draw Calligraphy/Technical description at the bottom
    font_callig = get_font("Courier New", 14) or get_font("Georgia", 14)
    desc_text = "WOODBLOCK INK STAMP / DIGITAL ARTIFACT: PALGLE BLOG / REVIVAL VER 2024"
    if font_callig:
        bbox = draw.textbbox((0, 0), desc_text, font=font_callig)
        dw = bbox[2] - bbox[0]
        # Pressed ink bleed text style (slight offset duplicate)
        draw.text(((canvas_w - dw)//2 + 1, canvas_h - 70 + 1), desc_text, fill=(200, 190, 170, 255), font=font_callig)
        draw.text(((canvas_w - dw)//2, canvas_h - 70), desc_text, fill=(40, 35, 30, 230), font=font_callig)
        
    canvas.convert("RGB").save("public/images/palgle-thumb.png", "PNG")
    print("Success: Woodblock ink stamp thumbnail created for Palgle.")

# =====================================================================
# 3. TANZ-STATION: 19th Century British Ballroom Silver Mirror Frame
# =====================================================================
def make_tanz_station_ballroom():
    print("🎨 Creating Tanz-Station Ballroom Thumbnail...")
    canvas_w, canvas_h = 1280, 800
    
    # Base: Elegant, luxurious warm gold/beige damask wallpaper wallpaper
    canvas = create_noise_texture(canvas_w, canvas_h, (242, 232, 218, 255), noise_opacity=0.08)
    
    # Overlay elegant classic damask lines
    draw = ImageDraw.Draw(canvas)
    for x in range(0, canvas_w, 40):
        draw.line([x, 0, x, canvas_h], fill=(225, 212, 195, 255), width=1)
        
    canvas = draw_vignette(canvas, color=(110, 85, 60, 160), factor=0.45) # Soft candlelit glow vignette
    
    # Load screenshot
    ss = Image.open("docs/projects/assets/tanz-station-screenshot.png").convert("RGBA")
    
    # Romantic warm golden/candlelit wash on screenshot
    ss = apply_sepia_filter(ss, intensity=0.4)
    # Blend with amber tone
    amber = Image.new("RGBA", ss.size, (255, 170, 50, 40)) # Warm ballroom light glow
    ss = Image.alpha_composite(ss, amber)
    
    # Resize screenshot
    inner_w, inner_h = 750, 469
    ss_resized = ss.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
    
    # Position
    frame_outer_w = inner_w + 60
    frame_outer_h = inner_h + 60
    fx = (canvas_w - frame_outer_w) // 2
    fy = (canvas_h - frame_outer_h - 40) // 2
    
    # Generate Victorian silver framed mirror chassis
    frame = Image.new("RGBA", (frame_outer_w, frame_outer_h), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(frame)
    
    # Multiple concentric silver/platinum rectangles representing Victorian mirror
    # Dark outline border
    f_draw.rectangle([0, 0, frame_outer_w, frame_outer_h], fill=(60, 60, 65, 255))
    # Polished Silver border
    f_draw.rectangle([4, 4, frame_outer_w-4, frame_outer_h-4], fill=(180, 180, 185, 255))
    # Brushed Platinum border
    f_draw.rectangle([10, 10, frame_outer_w-10, frame_outer_h-10], fill=(220, 220, 225, 255))
    # Dark bevel cut
    f_draw.rectangle([20, 20, frame_outer_w-20, frame_outer_h-20], fill=(95, 95, 100, 255))
    # Inner silver fillet
    f_draw.rectangle([26, 26, frame_outer_w-26, frame_outer_h-26], fill=(200, 200, 205, 255))
    # Deep mirror shadow recess
    f_draw.rectangle([28, 28, frame_outer_w-28, frame_outer_h-28], fill=(15, 15, 20, 255))
    
    # Paste screenshot inside Victorian frame
    frame.paste(ss_resized, (30, 30))
    
    # Subtle mirror shine reflection overlay (diagonal light gradient)
    shine = Image.new("RGBA", (inner_w, inner_h), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shine)
    sh_draw.polygon([0, 0, 180, 0, 0, 320], fill=(255, 255, 255, 30))
    sh_draw.polygon([inner_w-180, inner_h, inner_w, inner_h, inner_w, inner_h-320], fill=(255, 255, 255, 15))
    frame.paste(shine, (30, 30), shine)
    
    # Mirror drop shadow
    shadow = Image.new("RGBA", (frame_outer_w + 32, frame_outer_h + 32), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([16, 16, 16 + frame_outer_w, 16 + frame_outer_h], fill=(35, 25, 15, 130))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    
    # Composite onto canvas
    canvas.paste(shadow, (fx - 16, fy - 16 + 6), shadow)
    canvas.paste(frame, (fx, fy), frame)
    
    # Draw classical typography for the British Ballroom scheduler
    font_mirror = get_font("Georgia", 14) or get_font("Times New Roman", 14)
    mirror_label = "DIGITAL ARTIFACT: SEOUL TANZ STATION BALLROOM / REVIVAL VER 2022"
    
    if font_mirror:
        bbox = draw.textbbox((0, 0), mirror_label, font=font_mirror)
        dw = bbox[2] - bbox[0]
        # Draw elegant shadowed text
        draw.text(((canvas_w - dw)//2 + 1, canvas_h - 70 + 1), mirror_label, fill=(245, 240, 235, 200), font=font_mirror)
        draw.text(((canvas_w - dw)//2, canvas_h - 70), mirror_label, fill=(100, 80, 60, 240), font=font_mirror)
        
    canvas.convert("RGB").save("public/images/tanz-station-thumb.png", "PNG")
    print("Success: Victorian ballroom mirror thumbnail created for Tanz-Station.")

# Run the three artistic thumbnail generators
make_aki_in_gallery()
make_palgle_woodblock()
make_tanz_station_ballroom()

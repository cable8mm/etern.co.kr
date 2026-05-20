import os
import sys
from PIL import Image, ImageDraw, ImageFont

def find_sans_serif_font():
    # Common macOS font locations for Helvetica, Arial, or System Sans-Serif
    paths = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/HelveticaNeue.dfont",
        "/System/Library/Fonts/Supplemental/Courier New.ttf",
    ]
    for path in paths:
        if os.path.exists(path):
            print(f"Using font: {path}")
            return path
    print("Warning: No clean sans-serif font found. Falling back to default.")
    return None

def generate_logo_png(output_path, size=1024, dark=True):
    # Colors
    if dark:
        bg_color = (9, 9, 11, 255)      # zinc-950 (#09090b)
        border_color = (212, 212, 216, 255)  # zinc-300 (#d4d4d8)
        text_color = (250, 250, 250, 255)    # zinc-50 (#fafafa)
    else:
        bg_color = (250, 250, 250, 255)    # zinc-50 (#fafafa)
        border_color = (63, 63, 70, 255)    # zinc-700 (#3f3f46)
        text_color = (9, 9, 11, 255)       # zinc-950 (#09090b)

    # Create canvas
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    # Calculate border width (1px border on 36px is ~28px at 1024px)
    border_width = int(size * (1.0 / 36.0))
    if border_width < 1:
        border_width = 1

    # Draw border
    half_bw = border_width // 2
    draw.rectangle(
        [half_bw, half_bw, size - half_bw - 1, size - half_bw - 1],
        outline=border_color,
        width=border_width
    )

    # Load font
    font_path = find_sans_serif_font()
    font_size = int(size * (14.0 / 36.0)) # ~398px at 1024px

    font = None
    if font_path:
        try:
            # Handle TTC / DFONT with index or default
            font = ImageFont.truetype(font_path, font_size)
        except Exception as e:
            print(f"Error loading {font_path}: {e}")

    if not font:
        font = ImageFont.load_default()
        print("Using default font")

    # Draw text "LR" perfectly centered
    text = "LR"
    
    # Calculate text bounding box to center it precisely
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
    except AttributeError:
        # Fallback for older PIL versions
        text_w, text_h = draw.textsize(text, font=font)

    # Vertical correction for capital letters centering
    # Since bbox includes descenders, we shift it slightly upwards for better visual centering
    x = (size - text_w) // 2
    # Adjust alignment offset manually to get exact optical centering for capital letters
    # On most clean sans-serifs, shifting slightly up makes it look optically perfect
    y = (size - text_h) // 2 - int(text_h * 0.1)

    draw.text((x, y), text, fill=text_color, font=font)

    # Save PNG
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"PNG Logo saved successfully at: {output_path}")

def generate_logo_svg(output_path, dark=True):
    if dark:
        bg_color = "#09090b"
        border_color = "#d4d4d8"
        text_color = "#fafafa"
    else:
        bg_color = "#fafafa"
        border_color = "#3f3f46"
        text_color = "#09090b"

    # SVG text representation
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="{bg_color}" />
  <rect x="14" y="14" width="996" height="996" fill="none" stroke="{border_color}" stroke-width="28" />
  <text x="512" y="530" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="390" fill="{text_color}" text-anchor="middle" dominant-baseline="central">LR</text>
</svg>
"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"SVG Logo saved successfully at: {output_path}")

def generate_favicon_svg(output_path, dark=True):
    bg_color = "#09090b" if dark else "#fafafa"
    stroke_color = "#fafafa" if dark else "#09090b"
    
    # 16x upscale of the favicon
    # Original is 64x64, we scale coordinates by 16 (64 * 16 = 1024)
    # Origin 18 * 16 = 288
    # 12 * 16 = 192
    # stroke-width 4 * 16 = 64
    # rect width=1024, height=1024
    
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="{bg_color}" />
  <path
    fill="none"
    stroke="{stroke_color}"
    stroke-linecap="square"
    stroke-width="64"
    d="M288 288h288c112 0 192 80 192 192s-80 192-192 192H288V288Z"
  />
  <path fill="none" stroke="{stroke_color}" stroke-width="64" d="M288 512h288" />
</svg>
"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"SVG Favicon saved successfully at: {output_path}")

def generate_favicon_png(output_path, dark=True, size=1024):
    # Render the same favicon drawing onto PIL
    bg_color = (9, 9, 11, 255) if dark else (250, 250, 250, 255)
    stroke_color = (250, 250, 250, 255) if dark else (9, 9, 11, 255)
    
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw scaled favicon path
    # rect width=1024, height=1024
    # M288 288h288c112 0 192 80 192 192s-80 192-192 192H288V288Z
    # and line M288 512h288
    # stroke-width = 64
    
    # In Pillow, we can draw the rounded rectangle/arcs or rectangles.
    # Let's draw it using basic shapes for absolute sharpness:
    # The path consists of:
    # - A vertical line on the left: x = 288, from y = 288 to y = 672 (height 384)
    # - Top horizontal line: from x = 288 to x = 576, y = 288
    # - Bottom horizontal line: from x = 576 to x = 288, y = 672
    # - Middle horizontal line: from x = 288 to x = 576, y = 512
    # - A semi-circle on the right from y = 288 to y = 672, centered at x = 576, with radius 192
    
    # Let's draw with Pillow:
    stroke_width = 64
    
    # Draw the middle line
    draw.line([(288, 512), (576, 512)], fill=stroke_color, width=stroke_width)
    
    # Draw the outer shape:
    # We can draw the straight lines and then the arc.
    # Vertical line (left)
    draw.line([(288, 288), (288, 672)], fill=stroke_color, width=stroke_width)
    # Top horizontal line
    draw.line([(288, 288), (576, 288)], fill=stroke_color, width=stroke_width)
    # Bottom horizontal line
    draw.line([(288, 672), (576, 672)], fill=stroke_color, width=stroke_width)
    
    # Arc from y=288 to y=672, centered around x=576, radius=192
    # bounding box for the arc: x from 576-192=384 to 576+192=768
    # wait, the arc spans from -90 degrees (top, 270) to +90 degrees (bottom, 90)
    # Bounding box of full circle: left = 576 - 192 = 384, top = 288, right = 576 + 192 = 768, bottom = 672
    draw.arc([384, 288, 768, 672], start=270, end=90, fill=stroke_color, width=stroke_width)
    
    # Clean up joint pixels by drawing small ellipses or coordinates to make sure the joint is crisp
    # Since fill=none, we draw them with exact stroke width
    # In Pillow, arc is drawn with a bounding box, let's verify if it's perfectly crisp.
    # We can save it and let the user see.
    img.save(output_path, "PNG")
    print(f"PNG Favicon saved successfully at: {output_path}")

if __name__ == "__main__":
    logo_dir = "/Users/cable8mm/Herd/etern.co.kr/logo"
    os.makedirs(logo_dir, exist_ok=True)
    
    print("Generating header style 'LR' square logos...")
    generate_logo_png(os.path.join(logo_dir, "logo-1024-dark.png"), dark=True)
    generate_logo_png(os.path.join(logo_dir, "logo-1024-light.png"), dark=False)
    generate_logo_svg(os.path.join(logo_dir, "logo-1024-dark.svg"), dark=True)
    generate_logo_svg(os.path.join(logo_dir, "logo-1024-light.svg"), dark=False)
    
    print("Generating website favicon monogram logos...")
    generate_favicon_svg(os.path.join(logo_dir, "favicon-1024-dark.svg"), dark=True)
    generate_favicon_png(os.path.join(logo_dir, "favicon-1024-dark.png"), dark=True)
    
    print("\nAll 6 premium high-resolution logo assets generated in `/logo` directory.")

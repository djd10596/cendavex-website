#!/bin/bash
export GSETTINGS_SCHEMA_DIR=/tmp/cendavex-webkit-libs/root/usr/share/glib-2.0/schemas
export LD_LIBRARY_PATH=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/libproxy:/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu:/tmp/cendavex-browser-libs/root/usr/lib/x86_64-linux-gnu
export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1
export LIBGL_ALWAYS_SOFTWARE=1
export LIBGL_DRIVERS_PATH=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/dri
export __EGL_VENDOR_LIBRARY_FILENAMES=/tmp/cendavex-webkit-libs/root/usr/share/glvnd/egl_vendor.d/50_mesa.json
export GIO_EXTRA_MODULES=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/gio/modules
vision_tool_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../node_modules/.vision-media" && pwd)"
export LD_LIBRARY_PATH="$vision_tool_root/root/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH"
export GST_PLUGIN_SYSTEM_PATH_1_0="$vision_tool_root/plugins"
export GST_PLUGIN_SCANNER=/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-plugin-scanner
export GST_REGISTRY="$vision_tool_root/registry.bin"
exec "$@"

#!/usr/bin/env bash
# Optional host-only codec setup for this Ubuntu 26.04 test machine; no system install.
set -euo pipefail
vision_checkout="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$vision_checkout"
mkdir -p node_modules/.vision-media/debs node_modules/.vision-media/root
(cd node_modules/.vision-media/debs && apt-get download gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad libopenh264-8 libvpx12)
python3 - <<'PY'
from pathlib import Path
import shutil,subprocess
r=Path('node_modules/.vision-media');p=r/'plugins';p.mkdir(exist_ok=True)
for deb in (r/'debs').glob('*.deb'):subprocess.run(['dpkg-deb','-x',str(deb),str(r/'root')],check=True)
for name in ['coreelements','typefindfunctions','playback','videoconvertscale','audioconvert','audioresample','volume','app','isomp4','matroska','vpx','openh264','videoparsersbad','subparse','autodetect','subenc','audiofx','videofilter','deinterlace']:
    file='libgst'+name+'.so';src=r/'root/usr/lib/x86_64-linux-gnu/gstreamer-1.0'/file
    if not src.exists():src=Path('/tmp/cendavex-webkit-libs/root/usr/lib/x86_64-linux-gnu/gstreamer-1.0')/file
    shutil.copy(src,p/file)
PY

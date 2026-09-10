# Café logos and photos

Every card shows the café's **own logo**. There are three places it can come
from, and the card tries them in order, keeping the first that loads:

1. **A file in this folder**, named after the café — the list is below.
   Nothing else to change: drop `tamper.png` in here, redeploy, done.
2. **The café's Instagram profile picture**, when we have their handle. For a
   Kuwaiti café that picture is almost always their logo.
3. **The logo on their own website**, when we have their address.

If none of those loads, the card draws its own emblem — a ring in the café's
colour with its monogram — so the grid never has a hole in it.

2 and 3 are fetched by the visitor's browser straight from the café's own
channel, the way a link preview works. No business's artwork is copied into
this repository.

## Adding a logo

Drop a file in this folder with the matching name below. `.png` (transparent
background), `.svg`, `.jpg` and `.webp` all work, and a `-logo` suffix is fine
too — `tamper-logo.png` matches `tamper`. Square images look best; the badge
is 64px across.

Handles and addresses are only listed in `src/lib/cafes.ts` where we actually
have them. A guessed Instagram handle would put one business's logo on another
business's card, so blanks are left blank on purpose. If you know a café's
handle, add `instagram: "theirhandle"` to their entry and their real logo
appears with no file to host.

## Filenames

| File name | Café | Logo already sourced from |
| --- | --- | --- |
| `jumo-coffee-roasters` | JUMO Coffee Roasters | — |
| `stockroom` | Stockroom | their website |
| `vol-1` | VOL.1 | — |
| `arabica-shuwaikh` | % Arabica Shuwaikh | their website |
| `aroma` | Aroma | — |
| `caffeine` | Caffeine | — |
| `boost-cafe` | Boost Cafe | — |
| `car-wash-cafe` | Car Wash Cafe | — |
| `days-cafe` | Days*Cafe | — |
| `force-bar` | Force Bar | — |
| `keys-coffee-shop` | Keys Coffee Shop | — |
| `shuwaikh-coffee` | Shuwaikh Coffee | — |
| `ves-vas` | Ves Vas | — |
| `tamper` | Tamper | — |
| `east-cafe` | EAST Café | — |
| `the-coffee-department` | The Coffee Department | — |
| `richards-coffee` | Richards Coffee | — |
| `altitude` | Altitude | — |
| `beans-roastery` | Beans Roastery | — |
| `space-cafe` | Space Café | — |
| `grace-cafe` | Grace Cafe | — |
| `20-grams` | 20 Grams | — |
| `kaffa-specialty-coffee` | Kaffa Specialty Coffee | — |
| `coffee-republic` | Coffee Republic | — |
| `cafe-bazza` | Cafe Bazza | — |
| `tobys-estate` | Toby's Estate | their website |
| `dose-cafe` | Dose Café | their Instagram |
| `arabica-salmiya` | % Arabica Salmiya | their website |
| `tobys-estate-salmiya` | Toby's Estate Salmiya | their website |
| `wild-coffee-bar` | Wild Coffee Bar | — |
| `new-brew-coffee` | New Brew Coffee | — |
| `magnet` | Magnet | — |
| `muse-lounge` | Muse Lounge | — |
| `mr-koobs` | Mr Koobs | — |
| `mug-coffee-roastery` | Mug Coffee Roastery | — |
| `tobys-estate-jabriya` | Toby's Estate Jabriya | their website |
| `arabica-jabriya` | % Arabica Jabriya | their website |
| `dose-cafe-jahra` | Dose Café Jahra | their Instagram |
| `olea-cafe` | Olea Cafe | — |
| `good-stock` | Good Stock | their Instagram |
| `the-love-sweet` | The Love Sweet | their Instagram |

A dash means the card is drawing its own emblem: give it a file, or add the
café's Instagram handle in `src/lib/cafes.ts`, and it will show their real
logo instead.

## Branch photos

`photo: "/cafes/your-file.jpg"` on a café fills the whole card cover with a
real photograph of that branch (landscape, roughly 3:1). Only add photographs
you took or have the right to use — a stock image next to a real business
implies it is a picture of that place.

# 2ThumbZ — Live App Inventory

> **Verified 2026-08-29** against the **public** Apple App Store (iTunes Lookup API,
> artistId `329468827` — "2ThumbZ Entertainment") and the **public** Google Play
> store listings. No account consoles were accessed.
>
> Method: every locally-built bundle ID was requested from the public store URL.
> A real listing returns HTTP 200 with an `og:title`; an unpublished ID returns 404.
> Controls were run both ways to validate.

## Headline numbers (safe to use on the website)

| Metric | Verified count |
|---|---|
| **Live apps — Apple App Store** | **69** |
| **Live apps — Google Play** | **49** |
| **Total live apps across both stores** | **118** |
| Live apps — Samsung Galaxy Store (own listings) | **0** — see Samsung section |
| Distinct schools represented (Play watch faces) | 30 bundle variants / ~26 schools |
| Apple apps refreshed in the 2024 season | 32 |

### Samsung — how to describe it accurately

Samsung is a **device target**, not a separate storefront, for the current catalog:

- The **49 live Google Play watch faces run on Samsung Galaxy Watch.** They're built in
  Watch Face Format (WFF) — Google **and Samsung's** joint declarative format — and our own
  listing copy reads: *"Designed for round displays such as the Samsung Galaxy Watch and
  Google Pixel Watch."* Since Galaxy Watch moved to Wear OS, **Google Play is the Galaxy
  Watch store**, so these are genuinely Samsung-device apps.
- ✅ Safe to say: *"Collegiate watch faces for Samsung Galaxy Watch"* / *"Wear OS incl. Samsung"*
- ❌ Do **not** say: *"Available on the Samsung Galaxy Store"*

**Legacy Tizen catalog (retired).** 24 Samsung/Tizen packages are archived locally in
`2thumbz_watchfaces/old-watchface/` (32 designs incl. Alabama, Georgia, Ohio State, Michigan,
Florida, Notre Dame, Oklahoma, Tennessee, UNC, LSU, FSU, Oregon, Miami, plus military
editions). **All verified 404 on the Galaxy Store today** — Samsung retired Tizen watch faces
in the move to Wear OS. Usable as *history* ("shipping collegiate faces on Samsung since the
Tizen era"), never as current availability.

### Apple App Store — by type
| Type | Count |
|---|---|
| Stickers & Emojis (iMessage) | 58 |
| Keyboards | 7 |
| Themes & Wallpapers | 1 |
| Games | 1 |
| Other | 2 |
| *(6 free, 63 paid)* | |

---

## ⚠️ Status flags — read before publishing claims

| Claim | Status |
|---|---|
| **CollegeWatch on Apple Watch** | ❌ **NOT PUBLISHED.** `com.twothumbz.collegewatch` returns 0 results on the App Store. The project brief targets launch on **Aug 29, 2026** (today). Do **not** list it under "Recent Launches" until it is live. |
| Collegiate watch faces on Google Play | ✅ 49 live apps, verified |
| Collegiate stickers/keyboards on App Store | ✅ 69 live apps, verified |
| Collegiate apparel on Meta Avatars | ✅ Real — promo video supplied by Andy (`video/meta-school-gear.mp4`) |
| Fight songs in NBA 2K27 (2K Games) | ⚠️ **UNVERIFIED** — asserted by Andy; no local artifact or public listing checked. Confirm before publishing. |

---

## Apple App Store — 69 live apps

| App | Bundle ID | Price | Last updated |
|---|---|---|---|
| Aggies Sticker Pack 2024 | `com.2thumbz.Aggies-Animated-Stickers` | $1.99 | 2024-09-08 |
| Alabama Crimson Tide Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.alabama` | $0.99 | 2017-09-04 |
| Arkansas Razorbacks Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.arkansas` | $0.99 | 2016-10-10 |
| Auburn Eagles Sticker Pack '24 | `com.2thumbz.AuburnEagles-Animated-Stickers` | $1.99 | 2024-09-08 |
| Auburn Tigers Keyboard | `com.keemoji.auburn.university.keyboard` | $2.99 | 2021-11-30 |
| Auburn University Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.auburn` | $0.99 | 2016-10-04 |
| Blue Devils Sticker Pack 2024 | `com.2thumbz.BlueDevils-Animated-Stickers` | $1.99 | 2024-09-08 |
| Buckeyes Sticker Pack 2024 | `com.2thumbz.OhioST-Animated-Stickers` | $1.99 | 2024-09-08 |
| Catamounts Sticker Pack 2024 | `com.2thumbz.Catamounts-Animated-Stickers` | Free | 2024-09-08 |
| Clemson Animated Stickers 2024 | `com.2thumbz.Clemsontigers` | $1.99 | 2024-08-29 |
| Clemson Tigers Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.clemson` | $0.99 | 2016-10-10 |
| College Central Live Themes | `com.twothumbz.liveWallpaper` | Free | 2020-11-06 |
| College Emojis | `com.collegeemojis.emojisapp` | Free | 2022-11-21 |
| CollegeMoji : College Emojis and Sticker Keyboard | `com.pupsidedown.collegemoji` | Free | 2017-01-26 |
| Cornhuskers Sticker Pack 2024 | `com.2thumbz.Cornhuskers-Animated-Stickers` | $1.99 | 2024-09-09 |
| Crimson Tide Animated Emojis | `com.pupsidedown.imessage.alabama-animated` | $2.99 | 2017-10-05 |
| Crimson Tide Sticker Pack 2024 | `com.2thumbz.Crimson-Tide-Animated-Stickers` | $1.99 | 2024-09-08 |
| FSU Seminoles Keyboard | `com.keemoji.fsu.seminoles.keyboard` | $2.99 | 2021-11-20 |
| FSU Seminoles Stickers - iMsg | `com.pupsidedown.collegemoji.stickers.floridastate` | $0.99 | 2018-10-08 |
| Florida Gators Keyboard | `com.keemoji.2tfgu.keyboard` | $2.99 | 2021-11-30 |
| Gamecocks Sticker Pack 2024 | `com.2thumbz.Gamecocks` | $1.99 | 2024-09-08 |
| Gators Animated Sticker Pack | `com.uofFlorida2024.UofFlorida-2024` | $1.99 | 2024-09-08 |
| Gonzaga University Animated+Stickers for iMessage | `com.pupsidedown.stickers.animated.Gonzaga` | $2.99 | 2024-08-17 |
| Horned Frogs Sticker Pack 2024 | `com.2thumbz.HornedFrogs` | $1.99 | 2024-09-16 |
| Hurricanes Sticker Pack 2024 | `com.2thumbz.Hurricanes` | $1.99 | 2024-09-04 |
| InfiniteRunner - College Ball | `com.twothumbz.infiniterunner` | Free | 2018-10-19 |
| JMU Dukes Sticker Pack 2024 | `com.2thumbz.JMU` | $1.99 | 2024-09-08 |
| Jayhawks Sticker App 2024 | `com.2thumbz.Jayhawks` | $1.99 | 2024-09-17 |
| LSU Tigers Sticker Pack 2024 | `com.2thumbz.LSUTigers` | $1.99 | 2024-09-08 |
| Longhorns Sticker Pack 2024 | `com.2thumbz.Longhorns-Animated-Stickers` | $1.99 | 2024-09-08 |
| Michigan State University Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.michiganstate` | $0.99 | 2016-10-04 |
| Notre Dame Pro Selfie Stickers | `com.pupsidedown.stikis.notre-dame-plus` | $1.99 | 2024-08-17 |
| Notre Dame Stickers 2024 | `com.2thumbz.NotreDame` | $1.99 | 2024-09-04 |
| OSU Buckeyes Animated Emojis | `com.pupsidedown.imessage.ohio-animated` | $2.99 | 2017-10-22 |
| Ohio State Buckeyes Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.ohio-regular` | $0.99 | 2016-11-02 |
| Ohio State University Stickers PLUS for iMessage | `com.pupsidedown.collegemoji.stickers.ohio` | $1.99 | 2016-11-02 |
| Oklahoma Sooners Keyboard | `com.keemoji.oklahomasooners.keyboard` | Free | 2021-10-26 |
| Oklahoma Sooners Stickers PLUS for iMessage | `com.pupsidedown.imessage.oklahoma-plus` | $1.99 | 2017-08-31 |
| Oregon Ducks Animated Emojis | `com.pups.collegemoji.stickers.animated.Oregon` | $2.99 | 2017-09-29 |
| Oregon Ducks Sticker Pack 2024 | `com.2thumbz.ODucks` | $1.99 | 2024-09-06 |
| PennState University Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.pennstate` | $0.99 | 2016-10-05 |
| Purdue Animated+Stickers for iMessage | `com.pups.collegemoji.stickers.animated.Purdue` | $2.99 | 2017-03-07 |
| Razorbacks Sticker Pack 2024 | `com.2thumbz.Razorbacks` | $1.99 | 2024-09-16 |
| Seminoles Sticker Pack 2024 | `com.2thumbz.Seminoles-Animated-Stickers` | $1.99 | 2024-08-25 |
| Sooners Sticker Pack 2024 | `com.2thumbz.Sooners` | $1.99 | 2024-09-08 |
| Spartans Sticker Pack 2024 | `com.2thumbz.MSU` | $1.99 | 2024-09-02 |
| Tar Heels Sticker Pack 2024 | `com.2thumbz.UNC-Animated-Stickers` | $1.99 | 2024-09-08 |
| Texas A&M Animated Emojis | `com.pupsidedown.imessage.texas-am-animated` | $2.99 | 2017-10-05 |
| Texas A&M Official Keyboard | `com.keemoji.texasam.university.keyboard` | $2.99 | 2021-11-26 |
| Texas A&M University Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.texasam` | $0.99 | 2016-10-05 |
| Texas Tech Official Keyboard | `com.keemoji.ttredraiderkeyboard.keyboard` | $2.99 | 2021-11-26 |
| UGA Bulldogs Sticker Pack '24 | `com.2thumbz.Bulldogs-Animated-Stickers` | $1.99 | 2024-09-08 |
| UK Wildcats Pack Stickers 2024 | `com.2thumbz.Wildcats` | $1.99 | 2024-09-03 |
| UNC-Chapel Hill Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.northcarolina` | $0.99 | 2016-10-04 |
| USC Trojans Stickers PLUS for iMessage | `com.pupsidedown.imessage.usc-plus` | $1.99 | 2017-08-30 |
| UVA Cavaliers Stickers 2024 | `com.2thumbz.Cavaliers` | $1.99 | 2024-09-12 |
| University of Florida Gators Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.florida` | $0.99 | 2016-10-10 |
| University of Iowa Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.iowa` | $0.99 | 2016-10-05 |
| University of Michigan 2024 | `com.2thumbz.Wolverines-Animated-Stickers` | $1.99 | 2024-09-12 |
| University of Michigan Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.michigan` | $0.99 | 2016-10-04 |
| University of Oklahoma Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.oklahoma` | $0.99 | 2016-10-07 |
| University of South Carolina Animated+Stickers | `com.pups.collegemoji.stickers.animated.SouthCarolina` | $2.99 | 2017-03-17 |
| University of Tennessee Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.tennessee` | $0.99 | 2016-10-04 |
| University of Texas Longhorns Stickers PLUS | `com.pupsidedown.collegemoji.stickers.texas-premium` | $1.99 | 2017-09-06 |
| University of Texas Stickers for iMessage | `com.pupsidedown.collegemoji.stickers.texas` | $0.99 | 2017-09-06 |
| Virtual Hugs, Kisses & Prayers | `twothumbz.Virtual-Hugs` | $1.99 | 2020-05-22 |
| Volunteers Sticker Pack 2024 | `com.2thumbz.TennesseeVols` | $1.99 | 2024-09-02 |
| Wisconsin Badgers '24 Stickers | `com.2thumbz.wisconsin` | $1.99 | 2024-10-01 |
| Wolfpack Sticker Pack 2024 | `com.2thumbz.NCSU` | $1.99 | 2024-08-29 |

---

## Google Play — 49 live watch face apps

| App | Bundle ID |
|---|---|
| Alabama Premium Watchface | `com.twothumbz.watchface.alabama_premium` |
| Arkansas Razorbacks Classic | `com.twothumbz.watchface.arkansas_classic` |
| Arkansas Razorbacks Premium | `com.twothumbz.watchface.arkansas_premium` |
| Auburn Tigers Premium | `com.twothumbz.watchface.auburn_premium` |
| Clemson Tigers Classic | `com.twothumbz.watchface.clemson_classic` |
| Clemson Tigers Premium | `com.twothumbz.watchface.clemson_premium` |
| Duke Blue Devils Classic | `com.twothumbz.watchface.duke_classic` |
| Duke Blue Devils Premium | `com.twothumbz.watchface.duke_premium` |
| FSU Seminoles Classic | `com.twothumbz.watchface.fsu_classic` |
| Florida Premium Watchface | `com.twothumbz.watchface.florida_premium` |
| Florida State Premium | `com.twothumbz.watchface.fsu_premium` |
| Georgia Bulldogs Classic | `com.twothumbz.watchface.georgia_classic` |
| Georgia Premium Watchface | `com.twothumbz.watchface.georgia_premium` |
| Harvard Crimson Classic | `com.twothumbz.watchface.harvard_classic` |
| Kentucky Premium Watchface | `com.twothumbz.watchface.kentucky_premium` |
| Kentucky Wildcats Classic | `com.twothumbz.watchface.kentucky_classic` |
| LSU Classic Watchface | `com.twothumbz.watchface.lsu_classic` |
| LSU Premium Watchface | `com.twothumbz.watchface.lsu_premium` |
| Miami Hurricanes Classic | `com.twothumbz.watchface.miami_classic` |
| Miami Premium Watchface | `com.twothumbz.watchface.miami_premium` |
| Michigan Premium Watchface | `com.twothumbz.watchface.michigan_premium` |
| Michigan Wolverines Classic | `com.twothumbz.watchface.michigan_classic` |
| Mississippi State Classic | `com.twothumbz.watchface.mississippist_classic` |
| NC State Classic Watchface | `com.twothumbz.watchface.ncstate_classic` |
| NC State Premium Watchface | `com.twothumbz.watchface.ncsu_premium` |
| Notre Dame Classic Watchface | `com.twothumbz.watchface.notredame_classic` |
| Notre Dame Premium | `com.twothumbz.watchface.notredame_premium` |
| Ohio State Buckeyes Classic | `com.twothumbz.watchface.ohiostate_classic` |
| Ohio State Premium Watchface | `com.twothumbz.watchface.ohiostate_premium` |
| Oklahoma Sooners Classic | `com.twothumbz.watchface.oklahoma_classic` |
| Oklahoma Sooners Premium | `com.twothumbz.watchface.oklahoma_premium` |
| Ole Miss Rebels Classic | `com.twothumbz.watchface.olemiss_classic` |
| Ole Miss Rebels Premium | `com.twothumbz.watchface.olemiss_premium` |
| Oregon Premium Watchface | `com.twothumbz.premium.watchface_oregon` |
| S. Carolina Premium Watchface | `com.twothumbz.watchface.southcarolina_premium` |
| Tennessee Premium Watchface | `com.twothumbz.watchface.tennessee_premium` |
| Tennessee Volunteers Classic | `com.twothumbz.watchface.tennessee_classic` |
| Texas A&M Aggies Classic | `com.twothumbz.watchface.texasam_classic` |
| Texas A&M Aggies Premium | `com.twothumbz.watchace.tamu_premium` |
| Texas Longhorns Classic | `com.twothumbz.watchface.texas_classic` |
| Texas Longhorns Premium | `com.twothumbz.watchface.texas_premium` |
| UCLA Bruins Premium | `com.twothumbz.watchface.ucla_premium` |
| UCLA Classic Watchface | `com.twothumbz.watchface.ucla_classic` |
| UNC Premium Watchface | `com.twothumbz.watchface.unc_premium` |
| UNC Tar Heels Classic | `com.twothumbz.watchface.unc_classic` |
| USC Classic Watchface | `com.twothumbz.watchface.uscal_classic` |
| USC Trojans Premium | `com.twothumbz.watchface.uscal_premium` |
| Wisconsin Badgers Premium | `com.twothumbz.watchface.wisconsin_premium` |
| Wisconsin Classic Watchface | `com.twothumbz.watchface.wisconsin_classic` |

---

## Built but NOT public on Google Play (13)

These bundle IDs exist locally in `~/ClaudeCode/2thumbz_watchfaces/build/` but return 404
on the public store — either superseded, renamed, or never promoted to production:

`alabama_premium_spikeb`, `alabama_pure_mark_analog`, `bonus_alabama`, `florida_classic`,
`florida_pure_mark_analog`, `harvard_premium`, `lsu_pure_mark_analog`, `notre_dame_classic`,
`oregon_premium`, `osu_classic`, `tennessee_pure_mark_analog`, `texas_am_classic`,
`texasam_premium`

*(Note: several of these have a live equivalent under a slightly different ID — e.g.
`com.twothumbz.premium.watchface_oregon` is live while `oregon_premium` is not.)*

---

## How to re-verify

```bash
# Apple — all live apps for the developer
curl -s "https://itunes.apple.com/lookup?id=329468827&entity=software&limit=200"

# Google Play — one bundle id (200 = live, 404 = not published)
curl -s -o /dev/null -w '%{http_code}' \
  "https://play.google.com/store/apps/details?id=com.twothumbz.watchface.alabama_premium"
```

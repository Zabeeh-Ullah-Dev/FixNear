# FixNear — Design Specification

## Product and audience
A customer-facing local home-service finder for people who need a nearby electrician, plumber, mechanic, or technician. Primary action: find a relevant service and request a demo booking. Provider, review, and neighborhood data are sample content; all UI must disclose that it is a demo.

## Visual direction: Night-shift dispatch
- Mood: calm urgency and dependable dispatch-board clarity, not cyberpunk.
- Canvas: deep graphite shell (`#101310`), raised charcoal surfaces (`#191D19`, `#20251F`), fine olive-gray borders (`#30372E`).
- Accent: electric lime (`#D4F36A`) for primary CTA, active filter and availability/status cues; accent foreground dark graphite for contrast.
- Text: warm near-white (`#F0F2EA`), muted sage-gray (`#A2AA9B`), subtle (`#7E8879`). Status also uses labels/icons, not color alone.
- Typography: Space Grotesk for display/brand and Inter for UI/body, system fallbacks, `font-display: swap`.
- Shapes: crisp cards with 14–20px radius, high-contrast active states; no glass blur; low-opacity pinstripe/grid texture.
- Imagery: original night-city/service illustration, no text or logos baked in; crisp consistent line icons.

## Layout
- Sticky dark top bar with FixNear mark, browse nav, “List your service” secondary action, mobile menu.
- Split hero: left headline, concise copy, location/service search; right dispatch snapshot with tiny neighborhood grid and original hero visual. No fabricated live metrics; label sample data.
- Prototype-notice trust strip, explicitly distinguishing the concept from real provider verification.
- Category cards for electricians, plumbers, mechanics, technicians.
- Sample service listings with neighborhoods, illustrative prices, explicitly sample ratings and estimated response times.
- Filters for category, neighborhood, price/sort and clear-all.
- Reviews with visible illustrative-demo disclosure; never claim verified customers.
- How-it-works, FAQ and footer with prototype note.

## Interactions
- Location and service search filter seeded sample listings, case-insensitively; empty state has clear-filters action.
- Category, neighborhood and sort controls compose.
- Service cards open booking dialog. Fields: customer name, contact, preferred date, service note; visible labels, inline validation, cancel/close.
- Successful submit stores a demo request in localStorage and shows an accessible confirmation that it is not sent to a real provider.
- Reviews can be sorted/filtered. Any review form is local-only and marked as prototype; display-only is acceptable if needed.
- Navigation anchors work; mobile menu is keyboard-operable.

## Accessibility, responsiveness, motion
- Semantic header/nav/main/section/footer; one h1; skip link; visible focus, descriptive labels, accessible dialog (Escape/close/focus), associated form errors and live confirmation.
- Touch targets at least 44px where feasible; readable text.
- Mobile-first: 360–767px single column, 768–1099px flexible two columns, >=1100px desktop grid; test overflow.
- Contrast target WCAG AA. Reduced-motion disables nonessential transitions. UI transitions 150–250ms.

## SEO and delivery metadata
- Descriptive title/meta description; canonical/OpenGraph/Twitter aligned with repository; semantic headings and natural indexable copy; no sitemap until canonical production URL is known.
- README title/summary naturally include React local services finder and home services marketplace, real features, no keyword stuffing or star guarantees.

## Technical choices and boundaries
- React + Vite static SPA; minimal dependencies.
- Seeded illustrative data local to client; localStorage only for demo bookings/preferences.
- No live location API, payment, auth, provider backend, SMS/email, or verified reviews.
- Static deployments include the user module and required builder badge. App-session calls fail harmlessly outside its app host; app renders normally.

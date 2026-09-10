# Café photos and logos

Drop image files here, then point at them from `src/lib/cafes.ts`.

```ts
{
  name: "Dose Café Jahra",
  area: "Jahra",
  photo: "/cafes/dose-jahra.jpg",   // a photo of the branch
  logo:  "/cafes/dose-logo.png",    // the café's own logo
}
```

- **photo** fills the card's cover. Landscape works best, roughly 3:1.
- **logo** goes in the round badge on top. A square PNG with a transparent
  background looks best.
- Leave either out and the card draws its own Sadu-weave cover and a
  monogram badge, so the grid never looks broken.

Only add images you have the right to use — your own photographs, or logos
you have permission from the café to display.

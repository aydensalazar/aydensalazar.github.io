import type { Film } from "./films";

/**
 * AJ's Vault — childhood short films, shown at /ajvault and
 * /ajvault/[slug]. Uses the same `Film` shape as the main catalog so the
 * detail pages can share one template.
 *
 * Ordered newest-first (ties keep the order they were supplied in).
 *
 * PLACEHOLDERS: credits are intentionally empty for now.
 * Runtimes are from the YouTube videos, rounded to the nearest minute.
 *
 * SYNOPSES are drafts, deciphered from the videos themselves:
 *   • Surrounded — the film's own YouTube description, verbatim.
 *   • The War of the Worlds — YouTube auto-captions (first ~16 of 16 min).
 *   • The Prison Break — behind-the-scenes captions + the trailer's
 *     on-screen text cards ("captured and sent to a secret compound!",
 *     "Led by an undercover Nazi, the prisoners breakout!").
 *   • The Destroyer 2 — YouTube auto-captions (partial).
 * Review and reword freely.
 */

export const ajVaultFilms: Film[] = [
  {
    slug: "surrounded",
    title: "Surrounded",
    year: 2014,
    description:
      "Following a nuclear disaster, outnumbered soldiers fight to defend their outpost against hundreds of zombies.",
    thumbnail: "/img/ajvault/surrounded-thumbnail.png",
    poster: "/img/ajvault/surrounded-thumbnail.png",
    heroImage: "/img/ajvault/surrounded-hero.jpg",
    heroPosition: "50% 40%",
    titleImage: "/img/ajvault/surrounded-title.png",
    trailerUrl: "https://youtu.be/BA_BIPCP4GM",
    fullFilmUrl: "https://youtu.be/XtsbFB0qVMc",
    extras: [{ label: "Watch Bloopers", url: "https://youtu.be/P0w4NpDpYbU" }],
    genre: "War",
    runtime: "27 min",
    director: "Ayden Salazar",
    credits: [],
  },
  {
    slug: "the-war-of-the-worlds",
    title: "The War of the Worlds",
    year: 2014,
    description:
      "When a vacationer is found strangled in Greenville National Park, a sheriff and a cosmologist discover an alien presence in his camera\u2019s last photo \u2014 and must convince a skeptical mayor to shut the park down.",
    thumbnail: "/img/ajvault/the-war-of-the-worlds-thumbnail.png",
    poster: "/img/ajvault/the-war-of-the-worlds-thumbnail.png",
    heroImage: "/img/ajvault/the-war-of-the-worlds-hero.jpg",
    heroPosition: "50% 88%",
    titleImage: "/img/ajvault/the-war-of-the-worlds-title.png",
    trailerUrl: "https://youtu.be/P2T0VixRbJQ",
    fullFilmUrl: "https://youtu.be/q9eJwzM3U7o",
    extras: [
      {
        label: "Watch Behind the Scenes",
        url: "https://youtu.be/fSYcM7oQwRY",
      },
    ],
    genre: "Horror",
    runtime: "16 min",
    director: "Ayden Salazar",
    credits: [],
  },
  {
    slug: "the-prison-break",
    title: "The Prison Break",
    year: 2014,
    description:
      "Two World War 2 pilots crash their plane in German territory and are thrown into a secret prison compound. Led by an undercover guard, the prisoners stage a daring breakout \u2014 but not everyone makes it out.",
    thumbnail: "/img/ajvault/the-prison-break-thumbnail.png",
    poster: "/img/ajvault/the-prison-break-thumbnail.png",
    heroImage: "/img/ajvault/the-prison-break-hero.jpg",
    heroPosition: "50% 85%",
    titleImage: "/img/ajvault/the-prison-break-title.png",
    trailerUrl: "https://youtu.be/Rhd241hTX_Q",
    fullFilmUrl: "https://youtu.be/MqiBMcTlaUg",
    extras: [
      { label: "Watch Bloopers", url: "https://youtu.be/9sS6ehzI0iI" },
      {
        label: "Watch Behind the Scenes",
        url: "https://youtu.be/lQMJpbuPyN0",
      },
    ],
    genre: "War",
    runtime: "25 min",
    director: "Ayden Salazar",
    credits: [],
  },
  {
    slug: "the-destroyer-2",
    title: "The Destroyer 2",
    year: 2013,
    description:
      "Two thieves make off with a fortune in gold and diamonds \u2014 and a mysterious mask. Soon the Destroyer is back, and no gun can stop it.",
    thumbnail: "/img/ajvault/the-destroyer-2-thumbnail.png",
    poster: "/img/ajvault/the-destroyer-2-thumbnail.png",
    heroImage: "/img/ajvault/the-destroyer-2-hero.jpg",
    heroPosition: "50% 6%",
    titleImage: "/img/ajvault/the-destroyer-2-title.png",
    trailerUrl: "https://youtu.be/csIUtefroSo",
    fullFilmUrl: "https://youtu.be/JjQlm9D7HVk",
    genre: "Horror",
    runtime: "8 min",
    director: "Ayden Salazar",
    credits: [],
  },
];

export function getAjVaultFilmBySlug(slug: string): Film | undefined {
  return ajVaultFilms.find((film) => film.slug === slug);
}

/** The single "AJ's Vault" card shown on /films. */
export const ajVaultCard = {
  href: "/ajvault",
  title: "AJ\u2019s Vault",
  thumbnail: "/img/ajvault/ajvault-card.png",
  meta: "Childhood films",
};

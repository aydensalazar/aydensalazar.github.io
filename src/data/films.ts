export interface Film {
  /** URL slug used at /films/[slug] */
  slug: string;
  title: string;
  year: number;
  /** Short blurb shown on /films card and the detail page hero. */
  description: string;
  /** Path under /public for the landscape (16:9) YouTube thumbnail. */
  thumbnail: string;
  /** Path under /public for the vertical theatrical poster. Reserved for future use. */
  poster: string;
  /**
   * Optional richer image for the detail-page hero (e.g. a cinematic film
   * still). Falls back to `thumbnail` when not provided, so the catalog
   * card and the hero can have independent imagery.
   */
  heroImage?: string;
  /**
   * Optional white-on-transparent title lockup for the detail page hero.
   * When set it replaces the generic `<h1>{title}</h1>` so each film's
   * own logotype (script for "Save Me, San Francisco", block sans for
   * "Heli"/"Fangs", etc.) shows in the same block. Falls back to plain
   * text when omitted.
   */
  titleImage?: string;
  /** Full YouTube URL for the trailer. */
  trailerUrl: string;
  /** Full YouTube URL for the complete film. */
  fullFilmUrl: string;
  /** Optional runtime label shown in the detail page metadata row (e.g. "12 min"). */
  runtime?: string;
  /** Optional genre shown in the detail page metadata row (e.g. "Thriller"). */
  genre?: string;
  /** Optional rating shown in the detail page metadata row (e.g. "NR", "PG-13"). */
  rating?: string;
}

/**
 * Films are listed newest-first so the homepage and /films page surface the
 * latest work at the top of the catalog.
 */
export const films: Film[] = [
  {
    slug: "save-me-san-francisco",
    title: "Save Me, San Francisco",
    year: 2026,
    description:
      "A lighthearted dance rom-com set in San Francisco — a story of country boy meets city girl.",
    thumbnail: "/img/films/save-me-san-francisco-thumbnail.png",
    poster: "/img/films/save-me-san-francisco-poster.png",
    heroImage: "/img/films/save-me-san-francisco-hero.png",
    titleImage: "/img/films/save-me-san-francisco-title.png",
    trailerUrl: "https://youtu.be/5S-9itdyQ5c?si=ox_iu_fgID4_43-y",
    fullFilmUrl: "https://youtu.be/GzNhCHB80fc?si=BmXsIB_ArpwVD_Dq",
    genre: "Romance",
    rating: "NR",
  },
  {
    slug: "fangs",
    title: "Fangs",
    year: 2024,
    description:
      "A lone hunter does battle with a lab-born, colossal bat in the deserts of remote New Mexico.",
    thumbnail: "/img/films/fangs-thumbnail.png",
    poster: "/img/films/fangs-poster.png",
    heroImage: "/img/films/fangs-hero.png",
    titleImage: "/img/films/fangs-title.png",
    trailerUrl: "https://youtu.be/6L3oINqMuVY?si=Y3vFeAqaJNfPGxtQ",
    fullFilmUrl: "https://youtu.be/rFUM6mrcjX8?si=6Zf9r7av6DB-5zoo",
    genre: "Horror",
    rating: "NR",
  },
  {
    slug: "heli",
    title: "Heli",
    year: 2023,
    description:
      "A lone driver on a desolate countryside highway is pursued and terrorized by the malevolent pilot of a helicopter.",
    thumbnail: "/img/films/heli-thumbnail.png",
    poster: "/img/films/heli-poster.png",
    heroImage: "/img/films/heli-hero.png",
    titleImage: "/img/films/heli-title.png",
    trailerUrl: "https://youtu.be/BhquC8bY5w4?si=i4WbR3xAA_M8oSJ4",
    fullFilmUrl: "https://youtu.be/oBt15u09mEk?si=vWDLOqyVNu1yawqc",
    genre: "Thriller",
    rating: "NR",
  },
];

export function getFilmBySlug(slug: string): Film | undefined {
  return films.find((film) => film.slug === slug);
}

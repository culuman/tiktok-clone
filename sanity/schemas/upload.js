export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'opis',
        title: 'Naslov',
        type: 'string',
      },
      {
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'korisnikId',
        title: 'KorisnikId',
        type: 'string',
      },
      {
        name: 'postavio',
        title: 'Postavio',
        type: 'postavio',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'korisnik' }],
          },
        ],
      },
      {
        name: 'komentari',
        title: 'Komentari',
        type: 'array',
        of: [{ type: 'komentar' }],
      },
      {
        name: 'tema',
        title: 'Tema',
        type: 'string',
      },
    ],
  };
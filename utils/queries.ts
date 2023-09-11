export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
      postavio->{
        _id,
        korisnickoIme,
        slika
      },
    likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
      _id,
      korisnickoIme,
      slika
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
    postavio->{
      _id,
      korisnickoIme,
      slika
    },
     likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || tema match '${searchTerm}*'] {
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
    postavio->{
      _id,
      korisnickoIme,
      slika
    },
likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
      _id,
      korisnickoIme,
      slika
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (korisnikId: string | string[]) => {
  const query = `*[_type == "korisnik" && _id == '${korisnikId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "korisnik"]`;

  return query;
};

export const userCreatedPostsQuery = (korisnikId: string | string[]) => {
  const query = `*[ _type == 'post' && korisnikId == '${korisnikId}'] | order(_createdAt desc){
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
    postavio->{
      _id,
      korisnickoIme,
      slika
    },
 likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
      _id,
      korisnickoIme,
      slika
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (korisnikId: string | string[]) => {
  const query = `*[_type == 'post' && '${korisnikId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
    postavio->{
      _id,
      korisnickoIme,
      slika
    },
 likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
      _id,
      korisnickoIme,
      slika
    },
    }
  }`;

  return query;
};

export const topicPostsQuery = (tema: string | string[]) => {
  const query = `*[_type == "post" && tema match '${tema}*'] {
    _id,
     opis,
       video{
        asset->{
          _id,
          url
        }
      },
      korisnikId,
    postavio->{
      _id,
      korisnickoIme,
      slika
    },
 likes,
    komentari[]{
      komentar,
      _key,
      postavio->{
      _id,
      korisnickoIme,
      slika
    },
    }
  }`;

  return query;
};

export interface Video {
    opis: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    _id: string;
    postavio: {
      _id: string;
      korisnickoIme: string;
      slika: string;
    };
    likes: {
      postavio: {
        _id: string;
        korisnickoIme: string;
        slika: string;
      };
    }[];
    komentari: {
      komentar: string;
      _key: string;
      postavio: {
        _ref: string;
      };
    }[];
    korisnikId: string;
  }
  
  export interface IKorisnik {
    _id: string;
    _type: string;
    korisnickoIme: string;
    slika: string;
  }
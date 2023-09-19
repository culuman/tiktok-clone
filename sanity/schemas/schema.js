import post from './upload';
import korisnik from './korisnik';
import komentar from './komentar';
import postavio from './postavio';

export const schema = {
    types: [post, korisnik, postavio, komentar],
  }
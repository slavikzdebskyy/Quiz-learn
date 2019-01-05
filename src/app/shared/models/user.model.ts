export class User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  englishLevel: string;
  token: any[];

  constructor (name, lastName, email, password, country, city, englishLevel) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.country = country;
    this.city = city;
    this.englishLevel = englishLevel;
  }
}



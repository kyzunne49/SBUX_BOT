const fetch = require ('node-fetch');
const puppeteer = require ('puppeteer');
const fs = require ('fs');
const readlineSync = require ('readline-sync');
const cheerio = require ('cheerio');
const chalk = require ('chalk');
const moment = require ('moment');
const { resolve } = require('path');

const getDataName = () => new Promise((resolve,reject)=>{
    fetch('https://name-fake.com/id_ID', {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-GB,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Cookie': 'PHPSESSID=78fd62f29ab0d35bb777ca6edfffb335; prefetchAd_2861429=true',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'TE': 'trailers'
        }
 })
 .then(ress => ress.text())
 .then(async result => {
     const $ = await cheerio.load(result);
    const firstName = $('div[id=copy1]').text();
    const lastName = $('div[id=copy2]').text();
    const ressEmail = $('div[id=copy4]').text().split("@");
    const dnsEmail = ressEmail[0] + Math.floor(Math.random() * 1000)+ "@getnada.com";
    
     resolve({
         firstName: firstName,
         lastName: lastName,
         email: dnsEmail
     })
 }).catch(err => reject(err))
});



const getData = (phone) => new Promise ((resolve, reject) => {
    fetch('https://api2.sbuxcard.com//v1/auth/generate-sms-otp', {
        method: 'POST',
        headers: {
            "user-agent": "Dart/2.17 (dart:io)",
            "x-signature": "1663685232458:e75c544db1782228865f27a2f1fed11acaad1308587538bdf7546ac104fe4d3c",
            "accept-language": "en",
            //"accept-encoding: gzip",
            // "content-length": `${data}`,
            "host": "api2.sbuxcard.com",
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({"phoneNumber":phone
})
    })
    .then (ress => ress.json())
    .then (result => {
        resolve (result)
    })
    .catch (err => reject (err))
});

const validOtp = (otp, phone) => new Promise ((resolve, reject) => {
    fetch ('https://api2.sbuxcard.com//v1/auth/validate-sms-otp', {
        method: 'POST',
        headers:{
            "user-agent": "Dart/2.17 (dart:io)",
            "x-signature": "1663685259200:1e4bc50096b733dab0ff47df665c4d0f571dc8eb8f2728b9846473acf160170b",
            "accept-language": "en",
            //"accept-encoding: gzip",
            // "content-length": `${data}`,
            "host": "api2.sbuxcard.com",
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            "otp":otp,"phoneNumber":phone
        })
    })
    .then (ress => ress.json())
    .then (result => {
        resolve (result)
    })
    .catch (err => reject (err))
});


 const register = (emailnya, firstNamee, lastNamee, phone, otpku ) => new Promise ((resolve, reject) => {
     fetch ('https://api2.sbuxcard.com//v1/customer/registration', {
         method: 'POST',
         headers: {
             "user-agent": "Dart/2.17 (dart:io)",
             "x-signature": "1663685259200:1e4bc50096b733dab0ff47df665c4d0f571dc8eb8f2728b9846473acf160170b",
             "accept-language": "en",
             //"accept-encoding: gzip",
             // "content-length": `${data}`,
             "host": "api2.sbuxcard.com",
             "Content-Type": "application/json",
         },
         body: JSON.stringify ({
            "email":emailnya,"password":"JKT123#","external_id":null,"first_name":firstNamee,"last_name":lastNamee,"dob":"2000-9-21","fav_beverage":"double chocolate greentea","direct_marcomm":true,"phone_number":phone,"referralCode":"HARYS-F7DBD8","otp":otpku
         })
     })
     .then (ress => ress.json())
     .then (result => {
        resolve (result)
     })
     .catch (err => reject (err))
 });

(async () => {

    let renewal;
    while (!renewal) {
        
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green('[') + chalk.red('!') + chalk.green(']'), `*Status:True*`);
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green('[') + chalk.red('!') + chalk.green(']'), `*Created BOT BY HR NETWORK ID`);
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green('[') + chalk.red('!') + chalk.green(']'), `*SBUX ACCOUNT CREATOR -- BACK END ACCESS`);
    
 

    const datanya = await getDataName();
    const firstNamee = datanya.firstName;
    const lastNamee = datanya.lastName;
    const emailnya = datanya.email
    
    console.log('');
    const questions = console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green('[') + chalk.red('!') + chalk.green(']'), 'Masukkin Nomor OTP nya >? ');
      const berapaAcc = readlineSync.question('Berapa Nomor OTP nya >? ');
      const reqOtp = await getData(berapaAcc);

      if (reqOtp.status == 200) {
         console.log('Otp Berhasil Dikirim');
      } else {
         console.log('Otp tidak Berhasil Dikirim');
      }


      const otp = readlineSync.question("Input OTP : ");
      const validOtpnya = await validOtp()
      console.log(validOtpnya);


       const inputRegist = await register(emailnya, firstNamee, lastNamee);
       console.log(inputRegist);

       const saveData = fs.appendFileSync('dataResultAcc.txt', emailnya + '|' + 'JKT123#' + '\n')

    // // const tester = await getData();
    // // console.log(tester);
}

})
();
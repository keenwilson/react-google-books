const mongoose = require("mongoose");
const Book = require("../models/book");

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    family: 4 // Use IPv4, skip trying IPv6
  }
);

const booksSeed = [
  {
    authors: ["Michaelann Martin"],
    _id: "5c3e29b2ecc3041a5ac64a11",
    googleId: "8lINUTi_GBYC",
    title: "Woman of Grace",
    subtitle: "A Bible Study for Married Women",
    link:
      "https://play.google.com/store/books/details?id=8lINUTi_GBYC&source=gbs_api",
    description:
      "Woman of Grace is an insightful and intimate Bible study written to help married women to grow in holiness in their day-to-day living. Drawing from her life experiences, Michaelann Martin offers ways that will help women improve their prayer lives, communicate with their family, and find fulfillment in their vocation. Each chapter includes questions that mine the rich teaching of Scripture and the Church to help women apply those principles in their own lives. Those who seek to grow in holiness as wives and mothers will benefit greatly from this study.",
    image:
      "http://books.google.com/books/content?id=8lINUTi_GBYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  {
    authors: ["Myrna Alexander"],
    googleId: "jcWWCgAAQBAJ",
    title: "After God's Heart",
    subtitle: "A Bible Study for Women on Loving and Obeying God from 1 Samuel",
    link:
      "https://play.google.com/store/books/details?id=jcWWCgAAQBAJ&source=gbs_api",
    description:
      "What do you have in common with Hannah, Samuel, Jonathan, and David? Myrna Alexander helps you discover the many ways these biblical characters are \"living definitions\" of people after God's heart. Find out how you—by following their example—can develop a heart attitude that sets you apart. Designed for individual or group use, After God's Heart helps you nurture a rich and intimate relationship with the Lord.",
    image:
      "http://books.google.com/books/content?id=jcWWCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  {
    authors: ["Jen Wilkin"],
    googleId: "xiTxCwAAQBAJ",
    title: "None Like Him",
    subtitle: "10 Ways God Is Different from Us (and Why That's a Good Thing)",
    link:
      "https://play.google.com/store/books/details?id=xiTxCwAAQBAJ&source=gbs_api",
    description:
      "God is self-existent, self-sufficient, eternal, immutable, omnipresent, omniscient, omnipotent, sovereign, infinite, and incomprehensible. We're not. And that's a good thing. Our limitations are by design. We were never meant to be God. But at the root of every sin is our rebellious desire to possess attributes that belong to God alone. Calling us to embrace our limits as a means of glorifying God's limitless power, Jen Wilkin invites us to celebrate the freedom that comes when we rest in letting God be God.",
    image:
      "http://books.google.com/books/content?id=xiTxCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  {
    authors: ["Jen Wilkin"],
    googleId: "uXQMvgAACAAJ",
    title: "1 Peter Bible Study Book",
    subtitle: "A Living Hope in Christ",
    link:
      "http://books.google.com/books?id=uXQMvgAACAAJ&dq=title:jen+wilkin&hl=&source=gbs_api",
    description:
      "Our inheritance through Christ is imperishable, undefiled, and unfading. In 1 Peter, a man of faith and flaws and eyewitness to the life of Christ challenges us to look beyond our current circumstances to a future inheritance. He shares his concerns on big picture issues for the early church, describes believers' true identity in Christ, and ultimately helps readers discover what it means to experience the Living Hope they have in Christ. Key themes of humility, submission, and identity in Christ guide the study of 1 Peter as participants are challenged to read the book in its entirety each week. Teaching videos are key to the understanding of this study. (9 sessions) Features: Personal study segments to complete between group sessions 9-session study with 8 weeks of homework Verse-by-verse approach to complete a book study Teaching videos that build upon and tie together the personal study available for purchase or rent (30 to 35 minutes per session) Benefits Expand your understanding of 1 Peter for personal spiritual growth by reading the book in its entirety throughout each week of study Follow a verse-by-verse approach to complete a book study Discover the gospel of Christ as learners seek to conform fully to the Scriptures Dig deeper into Scripture individually and alongside other women--both those new to Bible study and those more familiar with Scriptures--with this widely-applicable study Author: Jen Wilkin is a writer, teacher, and blogger at JenWilkin.net. She is the managing editor of The Village Church blog and leads the Flower Mound Women's Bible Study, an interdenominational Bible study with about 700 members representing 68 different churches. She earned a B.A. in English and a Master of Business Administration from Texas A&M. Jen wrote Women of the Word: How to Study the Bible with Both Our Hearts and Our Minds and has a 9-week DVD Bible study on The Sermon on the Mount.Jen grew up in Texas and came to saving faith in elementary school. Her childhood was marked by time spent in seven different denominations - a range of experience that left her with the conviction that knowing the Word was the only sure means of discerning truth from error. Jen's passion is to see women become articulate and committed followers of Christ, with a clear understanding of why they believe what they believe and grounded in the Word of God. She sees women as most frequently appealed to through their emotions. Because of that, she advocates for women to have Bible literacy, love God with their minds, and have their voices and giftings fully leveraged in the church.",
    image:
      "http://books.google.com/books/content?id=uXQMvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  }
];

async function seed() {
  await mongoose
    .connect(
      MONGODB_URI,
      options
    )
    .then(() => {
      console.log("Seed: Connected to Database");
    })
    .catch(err => {
      console.log("Seed: Not Connected to Database ERROR! ", err);
    });
  for (let book of booksSeed) {
    const { _id: bookId } = await new Book({
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      link: book.link,
      description: book.description,
      image: book.image,
      googleId: book.googleId
    }).save();
  }

  mongoose.disconnect();

  console.info("Seed: Done!");
}

seed();

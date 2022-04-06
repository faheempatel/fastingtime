// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Footer.module.css"

@val @scope(("window", "fathom"))
external trackGoal: (string, int) => unit = "trackGoal"

let hadiths = [
  "1-actions-are-by-intentions",
  "2-islam-iman-ihsan",
  "3-islam-is-built-upon-five",
  "4-deeds-are-by-their-final-actions",
  "5-rejection-of-evil-deeds-and-innovations",
  "6-protecting-the-heart",
  "7-the-religion-is-naseehah-sincere-advice",
  "8-the-sanctity-of-a-muslim",
  "9-obligations-are-according-to-ability",
  "10-restricting-oneself-to-the-permissible",
  "11-being-cautious-of-the-doubtful",
  "12-leaving-that-which-does-not-concern-you",
  "13-love-for-your-brother-what-you-love-for-yourself",
  "14-prohibition-of-blood-of-a-muslim",
  "15-islamic-manners",
  "16-the-forbiddance-of-anger",
  "17-prescription-of-ihsan-perfection",
  "18-follow-up-a-bad-deed-with-a-good-deed-1",
  "19-be-mindful-of-allah-and-allah-will-protect-you",
  "20-modesty-is-from-faith",
  "21-say-i-believe-in-allah-and-then-be-steadfast",
  "22-entering-paradise",
  "23-hastening-to-do-good",
  "24-the-forbiddance-of-oppression",
  "25-the-value-of-charity",
  "26-what-is-sadaqa",
  "27-righteousness-is-in-good-character",
  "28-the-obligation-of-following-the-sunnah",
  "29-means-of-goodness",
  "30-do-not-neglect-the-religious-obligations",
  "31-the-reality-of-zuhd-asceticism",
  "32-no-harming-nor-reciprocating-harm",
  "33-the-onus-of-proof-is-on-the-claimant-and-the-taking-of-an-oath-is-on-the-denier",
  "34-forbidding-evil-with-the-hands-speech-and-heart",
  "35-brotherhood-in-islam",
  "36-the-virtue-of-gathering-for-the-remembrance-of-allah",
  "37-the-grace-of-allah-and-his-mercy",
  "38-attaining-nearness-to-allah-and-his-love",
  "39-leniency-for-the-one-who-errs-the-one-who-forgets-and-the-one-who-is-forced",
  "40-be-in-this-world-as-a-traveler",
  "41-the-world-is-the-means-for-attaining-the-hereafter",
  "42-the-expanse-of-the-forgiveness-of-allah",
]

@react.component
let make = () => {
  let randomSlug = Belt.Array.shuffle(hadiths)[0]
  <div className={styles["container"]}>
    <p> {`Please keep me in your duas 🤲🏼`->React.string} </p>
    <a
      href={`https://40hadithnawawi.com/hadith/${randomSlug}`}
      onClick={_ => trackGoal("VNSAFHBS", 0)}>
      {"Read a random hadith"->React.string}
    </a>
  </div>
}

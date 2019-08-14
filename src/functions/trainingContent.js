export default function trainingContent(training) {
  const content = {
    situationHeader: "",
    situationBody: [],
    ninjaMoves: ""
  }
  switch (training) {
    case "Joins - Ninja Move 1":
      content.situationHeader = "2 Tables:"
      content.situationBody = ["friends", "spirit_animals"]
      content.ninjaMoves = "Find Chris Dirt Stevens' spirit animal! The correct ninja move must return only 1 row."
      break;
    case "Joins - Ninja Move 2":
    content.situationHeader = "2 Tables:"
    content.situationBody = ["friends", "spirit_animals"]
    content.ninjaMoves = "Find which friend doesn't have a spirit animal! The correct ninja move must return only 1 row."
      break;
    case "Joins - Ninja Move 3":
    content.situationHeader = "4 Tables:"
    content.situationBody = ["friends", "spirit_animals", "friends_music", "bands"]
    content.ninjaMoves = "Your friend's spirit animal is a mallard. Find their favorite bands!"
      break;
    case "Joins - Ninja Move 4":
    content.situationHeader = "3 Tables:"
    content.situationBody = ["friends", "friends_music", "bands"]
    content.ninjaMoves = "Find the bands that none of your friends like!"
        break;
    case "Aggregates - Ninja Move 1":
    content.situationHeader = "1 Table:"
    content.situationBody = ["bands"]
    content.ninjaMoves = "Find the average number of records sold! The correct ninja move must return only 1 row."
        break;
    case "Aggregates - Ninja Move 2":
    content.situationHeader = "1 Table:"
    content.situationBody = ["bands"]
    content.ninjaMoves = "Find the band name with the fewest records sold! The correct ninja move must return only 1 row. Extra Sensei-props if you can do this with 1 query with an aggregate function"
        break;
    case "Aggregates - Ninja Move 3":
    content.situationHeader = "2 Tables:"
    content.situationBody = ["friends_music", "bands"]
    content.ninjaMoves = "Find how many of your friends enjoy Britney Spears! The correct ninja move must return only 1 row."
        break;
    case "Aggregates - Ninja Move 4":
    content.situationHeader = "4 Tables:"
    content.situationBody = ["friends", "spirit_animals", "friends_music", "bands"]
    content.ninjaMoves = "One of your friends does not have a spirit animal. Find the sum of records sold by the bands that friend enjoys! The correct ninja move must return only 1 row."
        break;
    default:
      return null
  }
  return content
}

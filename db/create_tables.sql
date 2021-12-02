DROP TABLE IF EXISTS planets;
CREATE TABLE planets(
	id CHAR(3) PRIMARY KEY,
  	name TEXT NOT NULL,
  	distance_from_sun REAL NOT NULL,
  	diameter REAL NOT NULL,
  	moons REAL NOT NULL,
  	length_of_year REAL NOT NULL,
  	avg_temp REAL,
  	min_temp REAL,
  	max_temp REAL,
  	first_record TEXT,
  	recorded_by TEXT,
  	facts TEXT,
  	stars REAL DEFAULT 0
);

INSERT INTO planets(id, name, distance_from_sun, diameter, moons, length_of_year, avg_temp, min_temp, max_temp, first_record, recorded_by, facts)
VALUES
	('mer', 'Mercury', 57909227, 4879, 0, 88, 167, -173, 427, '14th century BC', 'Assyrian astronomers', 'It’s not known who discovered Mercury. Mercury is the smallest planet in the Solar System. Mercury has a molten core.'),
	('ven', 'Venus', 108209475, 12104, 0, 225, 464, null, null, '17th century BC', 'Babylonian astronmers', 'The Earth’s rotation is gradually slowing. Earth is the only planet not named after a god. The Earth is the densest planet in the Solar System. Earth has a powerful magnetic field.'),
	('ear', 'Earth', 149598262, 12756, 1, 365.24, 15, -88, 58, null, null, 'The Earth’s rotation is gradually slowing. Earth is the only planet not named after a god. The Earth is the densest planet in the Solar System. Earth has a powerful magnetic field.'),
	('mar', 'Mars', 227943824, 6779, 2, 687, null, -87, -5, '2nd millennium BC', 'Egyptian astronomers', 'Mars and Earth have approximately the same landmass. Mars is home to the tallest mountain in the solar system. Pieces of Mars have fallen to Earth. Mars takes its name from the Roman god of war. One day Mars will have a ring. Sunsets on Mars are blue.'),
	('jup', 'Jupiter', 778340821, 139822, 79, 4333, -108, null, null, '7th or 8th century BC', 'Babylonian astronmers', 'Jupiter has the shortest day of all the planets. The Great Red Spot is a huge storm on Jupiter. Jupiter’s moon Ganymede is the largest moon in the solar system. Eight spacecraft have visited Jupiter.'),
    ('sat', 'Saturn', 1426666422, 120536, 82, 10756, -140, null, null, '8th century BC', 'Assyrian astronomers', 'Saturn is the most distant planet that can be seen with the naked eye. Saturn is the flattest planet. Saturn’s upper atmosphere is divided into bands of clouds. Saturn has the most extensive rings in the solar system. Four spacecraft have visited Saturn.'),
    ('ura', 'Uranus', 2870658156, 51118, 27, 30687, -195, null, null, '13th March 1781', 'William Hershel', '"Uranus is often referred to as an “ice giant” planet. Uranus hits the coldest temperatures of any planet. Uranus has two sets of very thin dark coloured rings. Uranus’ moons are named after characters created by William Shakespeare and Alexander Pope. Only one spacecraft has flown by Uranus.'),
	('nep', 'Neptune', 4498396441, 49528, 14, 60190, -200, null, null, '23rd September 1846', 'Urbain Le Verrier & Johann Galle', 'Neptune is named after the Roman god of the sea. Neptune is the smallest gas giant. Neptune has 6 faint rings. Neptune has a very active climate. Only one spacecraft has flown by Neptune.');



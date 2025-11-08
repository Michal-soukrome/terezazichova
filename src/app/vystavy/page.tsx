"use client";

import { motion } from "framer-motion";

const educationData = [
  {
    years: "2014 – 2020",
    institution: "AVU, Akademie výtvarných umění v Praze",
    type: "education",
  },
  {
    years: "2018-2020",
    institution: "Ateliér kresby",
    detail: "škola Jířího Petrboka",
    type: "education",
  },
  {
    years: "2014-2018",
    institution: "Ateliér malířství III",
    detail: "škola Michaela Rittsteina",
    type: "education",
  },
  {
    years: "2012 – 2016",
    institution: "TUL Liberec, fakulta architektury",
    detail: "Environmental design / Bořek Šípek, Jaroslav Brabec",
    type: "education",
  },
  {
    years: "2008 – 2012",
    institution: "SUPŠ a VOŠ Turnov",
    detail: "umělecké odlévání kovů",
    type: "education",
  },
];

const soloExhibitions = [
  {
    year: "2024",
    exhibitions: [
      {
        title: "Neboj!",
        venue: "Galerie Ludvíka Kuby Poděbrady",
      },
      {
        title: "V říši",
        venue: "Galerie moderního umění v Hradci Králové",
      },
    ],
  },
  {
    year: "2023",
    exhibitions: [
      {
        title: "Gorila je v každé páté víle",
        venue: "Galerie Dolmen, Praha",
      },
    ],
  },
  {
    year: "2022",
    exhibitions: [
      {
        title: "Čtyři ruce by mi stačily",
        venue: "Orange Bar, Praha",
      },
    ],
  },
  {
    year: "2019",
    exhibitions: [
      {
        title: "Do třetice všeho dobrého",
        venue: "Galerie Mázhaus, Pardubice",
      },
      {
        title: "Druhá odraz charakteru",
        venue: "Galerie Flexup, Praha",
      },
    ],
  },
  {
    year: "2017",
    exhibitions: [
      {
        title: "První",
        venue: "Městské muzeum v Jaroměř",
      },
    ],
  },
];

const groupExhibitions = [
  {
    year: "2024",
    title: "Sprizneni volbou Michael Rittstein a Roman Franta a jejich žáci",
    venue: "Praha, Portheimka, The Chemistry Gallery",
  },
  {
    year: "2024",
    title:
      "Nová hmota studenti a absolventi ateliéru kresby AVU (Petrbok, Vaňous, Gerboc)",
    venue: "Praha, Portheimka, The Chemistry Gallery",
  },
  {
    year: "2023",
    title: "Úsměvy české grotesky",
    venue: "Galerie Kritiků, Praha",
  },
  {
    year: "2022",
    title: "Art Prague – XXI. ročník veletrhu současného umění",
    venue: "Praha",
  },
  {
    year: "2021",
    title: "Hmyz",
    venue: "Galerie Millennium, Praha",
  },
  {
    year: "2021",
    title: "Mégethos 28, Art Liebe(ň)",
    venue: "Kampus Hybernská, Praha",
  },
  {
    year: "2020",
    title: "Výstava diplomantů Akademie výtvarných umění",
    venue: "Praha",
  },
  {
    year: "2019",
    title: "Malba III AVU, Ateliér malířství III, 2001-2018",
    venue: "Praha",
  },
  {
    year: "2019",
    title: "Figurama",
    venue: "Kampus Hybernská, Praha",
  },
  {
    year: "2019",
    title: "Girls, Girls, Girls & Boys",
    venue: "Výstavní síň Lokart, Broumov",
  },
  {
    year: "2019",
    title: "Girls, Girls, Girls",
    venue: "Art & Event Gallery Černá labuť, Praha",
  },
  {
    year: "2018",
    title: "Galerie Art Praha",
    venue: "Praha",
  },
  {
    year: "2018",
    title: "Galerie U sv. Jakuba",
    venue: "Nový Bydžov",
  },
  {
    year: "2018",
    title: "32/36",
    venue: "Kasárna Karlín, Praha",
  },
  {
    year: "2016",
    title: "Figurama 16",
    venue: "Katowice, Polsko",
  },
  {
    year: "2015",
    title: "Kavárna Decada",
    venue: "Praha",
  },
  {
    year: "2014",
    title: "Těsně vedle",
    venue: "Galerie Josefa Lieslera, Kadaň",
  },
];

export default function Exhibitions() {
  return (
    <div className="min-h-screen py-6 lg:py-20 bg-white">
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-dot-pattern"></div>
      <div className="max-w-11/12 md:max-w-9/12  mx-auto px-3 lg:px-8 relative z-10 cursor-default">
        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-medium tracking-tight text-black mb-8 border-b border-gray-400 pb-4">
            Studia
          </h3>
          <div className="space-y-6">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex flex-col md:flex-row md:items-start gap-4 py-4 border-l-2 border-gray-100 pl-6"
              >
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {item.years}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {item.institution}
                  </h3>
                  {item.detail && (
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Solo Exhibitions Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-medium tracking-tight text-black mb-8 border-b border-gray-400 pb-4">
            Samostatné výstavy
          </h3>
          <div className="space-y-8">
            {soloExhibitions.map((yearGroup, yearIndex) => (
              <motion.div
                key={yearGroup.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + yearIndex * 0.1 }}
              >
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded text-sm mr-4">
                    {yearGroup.year}
                  </span>
                </h3>
                <div className="ml-16 space-y-3">
                  {yearGroup.exhibitions.map((exhibition, exIndex) => (
                    <div
                      key={exIndex}
                      className="border-l-2 border-gray-100 pl-6"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">
                        {exhibition.title}
                      </h4>
                      <p className="text-gray-600 text-sm italic">
                        {exhibition.venue}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Group Exhibitions Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="font-poppins text-2xl md:text-3xl font-medium tracking-tight text-black mb-8 border-b border-gray-400 pb-4">
            Skupinové výstavy
          </h3>
          <div className="space-y-4">
            {groupExhibitions.map((exhibition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                className="flex flex-col md:flex-row md:items-start gap-4 py-3 hover:bg-gray-50 transition-colors rounded-lg px-4 -mx-4"
              >
                <div className="md:w-16 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-500">
                    {exhibition.year}
                  </span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 mb-1 leading-snug">
                    {exhibition.title}
                  </h4>
                  <p className="text-gray-600 text-sm italic">
                    {exhibition.venue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

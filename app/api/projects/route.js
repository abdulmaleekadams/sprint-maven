import { NextResponse } from "next/server";

export const GET = () => {
    const projects = [
        {
          projectId: "betadeal",
          description:
            "Mollit sint Lorem nulla cupidatat dolore ex in mollit eiusmod cillum id ullamco ea consequat. Velit ut non ad adipisicing. Amet ipsum non velit anim nisi deserunt labore veniam mollit cillum eu cillum. Incididunt non pariatur incididunt Lorem aliquip quis reprehenderit cillum sint incididunt aute est ut nostrud.",
          projectTitle: "Bestdealsnaija",
          webLink: "https://www.bestdealsnaija.com",
        },
        {
          projectId: "alphadeal",
          description:
            "Labore labore culpa nulla reprehenderit exercitation laboris aliqua qui in sunt proident sunt enim cillum reprehenderit. Non duis est aliqua commodo fugiat labore labore pariatur cillum veniam sunt deserunt.",
          projectTitle: "TopDeals",
          webLink: "https://www.topdeals.com",
        },
        {
          projectId: "gammadiscount",
          description:
            "Culpa non commodo excepteur elit irure consequat ullamco occaecat pariatur adipisicing labore sunt. Ex exercitation voluptate aute eiusmod pariatur aliqua ex minim magna. Qui id ex minim sit ex excepteur ut tempor.",
          projectTitle: "GreatDeals",
          webLink: "https://www.greatdeals.com",
        },
        {
          projectId: "titan",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          projectTitle: "Titan Hub",
          webLink: "https://www.example.com/project4",
        },
        {
          projectId: "ebiore",
          description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          projectTitle: "Ebiore",
          webLink: "https://www.example.com/project5",
        },
        {
          projectId: "luday",
          description:
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
          projectTitle: "Luday Landing Page",
          webLink: "https://www.example.com/project6",
        },
        {
          projectId: "samurai",
          description:
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
          projectTitle: "Samurai",
          webLink: "https://www.example.com/project7",
        },
        {
          projectId: "kultura",
          description:
            "Suspendisse potenti. Nulla facilisi. Phasellus bibendum magna quis augue blandit lobortis.",
          projectTitle: "Kultura Blog",
          webLink: "https://www.example.com/project8",
        },
      ];

      return NextResponse.json({data: projects})
      
}
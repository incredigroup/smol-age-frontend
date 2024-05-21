export interface IslandData {
  id: string;
  title: string;
  description: React.ReactNode;
  npc: string;
  image: string;
  actions: string[];
  stats?: string[];
}

export const islandConfig = (section: string): IslandData => {
  switch (section) {
    case 'caves':
      return {
        id: 'caves',
        title: 'The Caves',
        description: (
          <p className="text-foreground">
            <span className="text-red-500">Shh, dont make a damn sound.</span> The Caves are where{' '}
            <span className="font-bold">Neandersmols</span> hibernate for a month. In the caves
            there are bones, but not as many as in some other places...
            <br />
            <br />
            <span className="font-bold">Neandersmols</span> earn 50 $BONES per day in the Cave.
            Neandersmols cannot leave before 30 days...{' '}
            <span className="text-red-500">duh, they're hibernating!</span>
          </p>
        ),
        npc: '/static/images/new/npc/sleepy.gif',
        image: '/static/images/new/islands/caves.png',
        actions: ['claim-caves-rewards', 'enter-caves', 'leave-cave'],
        stats: ['days', 'bones'],
      };
    case 'boneyard':
      return {
        id: 'bone_yard',
        title: 'The Boneyard',
        description: (
          <p className="text-foreground">
            <span className="text-red-500">Welcome to The Boneyard kid!</span> This is one of the
            first locations ever encountered by the <span className="font-bold">Neandersmols</span>.
            <br />
            <br />
            Here you can collect <span className="font-bold">$BONES</span> in large amounts.
            Neandersmols earn between x-x <span className="font-bold">$BONES</span> per day
            depending on staking lock period.
          </p>
        ),
        npc: '/static/images/new/npc/boneyard.gif',
        image: '/static/images/new/islands/boneyard.png',
        actions: [
          'claim-bones',
          // "stake-all-time",
          'stake-selected-time',
          'ustake-selected',
        ],
        stats: ['cs'],
      };
    case 'development-grounds':
      return {
        id: 'development_grounds',
        title: 'The Development Grounds',
        description: (
          <p className="text-foreground">
            <span className="text-red-500">Only the finest can enter!</span> The Development Grounds
            is where highly intelligent <span className="font-bold">Neandersmols</span> congregate
            to develop a unique ability.
            <br />
            <br />
            <span className="font-bold">Neandersmols</span> can choose the path of{' '}
            <span className="font-bold">Mystic, Farmer, Fighter</span>. Neandersmols must have at
            least 100 Common Sense to enter the Development Grounds.
          </p>
        ),
        npc: '/static/images/new/npc/wizard.gif',
        image: '/static/images/new/islands/development-grounds.png',
        actions: ['stake-development-grounds'],
        stats: ['dev-grounds'],
      };
    case 'labor-grounds':
      return {
        id: 'labor_grounds',
        title: 'The Labor Grounds',
        description: (
          <>
            <p className="mb-1 text-foreground">
              <span className="text-red-500">Get back to work you dumb idiot!</span> The Labour
              Grounds is where the'less bright' <span className="font-bold">Neandersmols</span> look
              for rare resources to bring home! <span className="font-bold">Neandersmols</span> must
              have less than 100 Common Sense to enter the Labour Grounds.
            </p>
            <p className="text-foreground">
              They use a Satchel to Forage, a Pickaxe to Mine, and a Shovel to Dig. Jobs take 72
              hours to complete and all tools are purchased from the Shop.
            </p>
          </>
        ),
        npc: '/static/images/new/npc/miner.gif',
        image: '/static/images/new/islands/labor-grounds.png',
        actions: [],
      };
    case 'school':
      return {
        id: 'school',
        title: 'The School',
        description: (
          <>
            <p className="mb-1 text-foreground">
              <span className="text-red-500">Don't be late!</span> The school is where you engage in
              learning to increase your Common Sense.
            </p>
            <p className="text-foreground">
              <span className="font-bold">Neandersmols</span> develop 1 Common Sense level per day
              per 1000 <span className="font-bold">$BONES</span> attached to them..
            </p>
          </>
        ),
        npc: '/static/images/new/npc/school.gif',
        image: '/static/images/new/islands/school.png',
        actions: ['attach-bones', 'remove-bones'],
      };
    case 'pits':
      return {
        id: 'pits',
        title: 'The Pits',
        description: (
          <p className="text-foreground">
            <span className="text-red-500">Welcome to the pits sir, how can I help you?</span> The
            Pits is where <span className="font-bold">Neandersmols</span> safekeep their{' '}
            <span className="font-bold">$BONES</span>.
            <br />
            <br />
            30% of the Total Supply of <span className="font-bold">$BONES</span> must be staked in
            the Pits to keep the Development and Labour Grounds from closing! Neandersmols also
            receive a luck boost for staking more than XXXX{' '}
            <span className="font-bold">$BONES</span> in the Pits.
            <br />
            <br />
            The Pits is also where <span className="font-bold">Neandersmols</span> stake their
            Council Passes in order to receive a luck boost! You can only stake 1 Council Pass per
            wallet.
          </p>
        ),
        npc: '/static/images/new/npc/banker.gif',
        image: '/static/images/new/islands/pits.png',
        actions: [],
      };
    default:
      return {
        id: 'island',
        title: 'The Island',
        description: 'The Island is where the game takes place.',
        image: '/static/images/new/islands/shop.png',
        npc: '',
        actions: [],
      };
  }
};

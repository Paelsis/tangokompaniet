import {PRIV_NONE, PRIV_MEMBER, PRIV_SALESMAN, PRIV_TEACHER, PRIV_SUPERUSER, PRIV_ALL} from 'Settings/Const'
const tkTeachers = [
    {
        id:0, 
        username:'anna',
        password:'päls',
        privileges: PRIV_SUPERUSER,
        firstName: 'Anna',
        lastName:'Sol', 
        shortname:'A',
        email:'anna@tangokompaniet.com',
        cellphone:'+46(0)705150345',
        featured:true, 
        active:true,
        givePrivateLesson:true,
        img: require('images/teachers/anna.jpg'),
        'SV': {
            text: 'Anna undervisar och arrangerar i Tangokompaniet sedan 2002. Hennes undervisning \
                ger möjlighet att utforska den egna kroppen, kommunikationen i dansen och \
                uttrycket i musiken. Hennes dans uttrycker hennes person; energi, glädje \
                och strävan efter medvetenhet. Hon är också en mycket aktiv DJ både regionalt ,\
                nationellt och internationellt och håller även seminarier om tangomusik och DJing.', 
        },        
        'EN': {
            text: 'Anna teaches and organizes in Tangokompaniet since 2002. \
                Her teaching offers the opportunity to explore her own body, \
                the communication in dance and the expression in the music. \
                Her dance expresses her person; energy, joy and the pursuit of consciousness. \
                She is also a very active DJ, both regionally, nationally and internationally, \
                and also hosts seminars on tango music and DJing.', 
        },      
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:1, 
        username:'daniel',
        password:'päls',
        privileges: PRIV_SUPERUSER,
        firstName: 'Daniel',
        lastName: 'Carlsson', 
        shortname:'D',
        email:'daniel@tangokompaniet.com',
        cellphone:'+46(0)736563609',
        featured:true, 
        active:true,
        givePrivateLesson:true,
        img:require('images/teachers/daniel.jpg'),
        'SV': {
            text: 'Daniel, en av Tangokompaniets grundare. Efter att ha tangoturnerat i världen \
                vill han satsa på att få Öresundstangon att växa snabbare. \
                Flyt, dynamik, fokus,  och fantasi!'
        },    
        'EN': {
            text: 'Daniel is one of the founders of Tangokompaniet. \
                 After touring around the world teaching tango during many years and teaching \
                 in over 20 countries Daniel decided to put more focus on making the Öresundtango \
                 grow in many aspects. For Daniel feeling, connection and creativity are the key words.', 
        },      
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:2, 
        username:'cecilia',
        password:'päls',
        privileges: PRIV_TEACHER,
        firstName: 'Cecilia',
        lastName: 'Warfvinge', 
        shortname:'C',
        email:'cecilia@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:true,
        givePrivateLesson:false,
        img:require('images/teachers/cecilia.jpg'),
        'SV': {
            text:'För Cecilia erbjuder tangon möjlighet att uttrycka dynamisk musikalitet, \
                och hennes dans har beskrivits som elegant och musikalisk. Hon har en bakgrund inom klassisk musik, \
                och har därför djup förståelse för musikens olika uttryck.\
                Cecilia inspireras av sitt intresse för fitness och kinesisk Tai Chi, \
                och förespråkar kroppslig kontroll och lekfullhet i dans och rörelser.'
        }, 
        'EN': {
            text: 'For Cecilia the tango offers the opportunity to express dynamic musicality, \
                and her dance has been described as elegant and musical. \
                She has a background in classical music, and therefore has a deep understanding of \
                the different expressions of music. \
                Cecilia is inspired by her interest in fitness and Chinese Tai Chi, \
                and advocates bodily control and playfulness in the dance.', 
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:3,
        username:'camila',
        password:'päls',
        privileges: PRIV_TEACHER,
        firstName: 'Camila',
        lastName: 'Holst-Viancos', 
        shortname:'CH',
        email:'camila@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:true,
        givePrivateLesson:false,
        img:require('images/teachers/camila.jpg'),
        'SV': {
            text: 'Text som beskriver Camila finns bara på engelska.'
        },     
        'EN': {
            text: 'Camila Viancos has a broad experience with teaching, dancing and performing from different \
            ance styles such as salsa and modern dancing. Her focus in tango dancing is connection, musicality \
            and body awareness. She is very passionated about teaching and she currently lives from teaching dance, \
            yoga and pilates. Camila is also performing as a singer and teaches musicality for salsa dancers \
            with live musicians.', 
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:4, 
        username:'nidia',
        password:'xxx',
        privileges: PRIV_TEACHER,
        firstName: 'Nidia',
        lastName: 'Martinez Barbieri', 
        shortname:'N',
        email:'nidia@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        givePrivateLesson:false,
        active:true,
        img:require('images/teachers/nidia.jpg'),
        'SV': {
            text: ''
        },     
        'EN': {text: 'Nidia is educated in contemporary / modern dance and works as a dancer, \
            choreographer and teacher. She is also Pilate’s instructor. Nidia started dancing tango \
            in Argentina and is interested in tango as social dance but also as a technique that \
            makes her artistic expression richer. As a teacher, she focuses on body communication and awareness. \
            She develops her training method for tango dancers with her knowledge of Pilates and Contact \
            Improvisation (contemporary / modern dance).', 
        }, 
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:5, 
        username:'per',
        password:'xxx',
        privileges: PRIV_TEACHER,
        firstName: 'Per',
        lastName: 'Berseus', 
        shortname:'P',
        email:'per@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:true,
        givePrivateLesson:true,
        img:require('images/teachers/per.jpg'),
        'SV': {
            text: 'Per undervisar på Tangokompaniet sedan 2005 och har gett lektioner på spännande platser \
            som Island, Thailand och Argentna. Han har spelat klassisk trumpet i tjugofem år och \
            jobbar gärna med musikalitet i dansen. \
            Per inspireras också av yoga och hur man där arbetar med både sin kropp och sina attityder.'
        }, 
        'EN': {
            text: 'With one foot in musicianship and the other in movement practices, \
                Per has an in-depth relationship with dancing and teaching. Ever since his childhood he has \
                kept playing in a symphony orchestra, and he was immediately captured by the tango music when \
                he started dancing in 2003. Over the last 10 years Per draws inspiration from movement \
                disciplines such as yoga and Gyrotonic, and he teaches tango as an embodied experience \
                of warm-hearted expression'    
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:6, 
        username:'sonny',
        password:'xxx',
        privileges: PRIV_TEACHER,
        firstName: 'Sonny',
        lastName: 'La', 
        shortname:'S',
        email:'sonny@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:true,
        givePrivateLesson:false,
        img:require('images/teachers/sonny.jpg'),
        'SV': {
            text: 'Tango är för Sonny en dans av närvaro och musikaliskt uttryck. \
            Hans dans kan beskrivas som medveten och lekfull. Sonny har en bakgrund inom kinesisk \
            Kung Fu och Tai Chi, och uppvisar både fysisk styrka och mjuk dynamik. \
            Med sin goda pedagogiska förmåga inspirerar han sina elever till att våga prova sig fram \
            och experimentera med sin dans.'
        },  
        'EN': {
            text: 'Tango is for Sonny a dance of presence and musical expression. His dance can be described \
            is conscious and playful. Sonny has a background in Chinese Kung Fu and Tai Chi, \
            exhibiting both physical strength and soft dynamics. With his good educational ability, \
            he inspires his students to dare to experiment and experiment with their dance.' 
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:7, 
        username:'tava',
        password:'xxx',
        privileges: PRIV_TEACHER,
        firstName: 'Tava',
        lastName: 'Sieh', 
        shortname:'TS',
        email:'tava@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:false,
        givePrivateLesson:true,
        img:require('images/teachers/tava.jpg'),
        'SV': {
            text: 'Tava började dansa tango i USA men har spenderat en längre tid i Argentina för att utveckla sin dans. \
                Hon är certifierad massageterapeut och har således en stor kunskap om kroppen. \
                Tavas undervisning är full av koncentration och samtidigt humoristisk'
        },
        'EN': {
            text: 'Tava’s love for dance and enthusiasm for teaching is informed by her experiences as a physiotherapist, \
                massage therapist, and yoga practitioner. She began her Tango journey in Boulder, Colorado and the path lead \
                quickly to Buenos Aires, and then onward Sweden where she has been teaching with Tangokompaniet since 2012'
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:8, 
        username:'tommy',
        password:'xxx',
        firstName: 'Tommy',
        lastName: 'Leite', 
        shortname:'T',
        email:'tommy@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:false,
        givePrivateLesson:true,
        img:require('images/teachers/tommy.jpg'),
        'SV': {
            text: 'Tommy gillar kreativiteten och energi i dansen och att förmedla detta ger dansglädje. \
                Han har en stor förmåga att möta människor på deras nivå och skapa samförstånd i undervisningen \
                vilket uppskattas mycket av eleverna. Tommy utforskar sin tango med resor \
                och tar själv undervisning med jämna mellanrum för att finna ny inspiration.'      
        },  
        'EN': {
            text: 'No translation to English', 
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },
    {
        id:9, 
        username:'ellinor',
        password:'päls',
        privileges: PRIV_TEACHER,
        firstName: 'Ellinor',
        lastName: 'Westrup', 
        shortname:'E',
        email:'ellinor@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:false,
        givePrivateLesson:true,
        img:require('images/teachers/ellinor.jpg'),
        'SV': {
            text:'För Ellinor är tango att improvisera i en ordlös kommunikation och hennes dans beskrivs \
                som både klassisk och dynamisk. Hon arbetar ständigt med att utveckla sin tango djupare. \
                Ellinor har undervisat i Tangokompaniet sedan 2007. Genom pedagogiskt lärande vill hon ge sina elever \
                den nödvändiga säkerhet och frihet som behövs för att dansa med känsla, god teknik och kroppsmedvetenhet.'
            },      
            'EN': {
                text: 'No translation to English', 
            },  
            'ES': {
                text: 'Sin traduccíon al esopañol', 
            },
    },
    {
        id:10,
        username:'jessika',
        password:'päls',
        privileges: PRIV_TEACHER,
        firstName: 'Jessica',
        lastName: 'Carlsson', 
        shortname:'J',
        email:'jessica@tangokompaniet.com',
        cellphone:null,
        featured:false, 
        active:false,
        givePrivateLesson:false,
        img:require('images/teachers/jessica.jpg'),
        'SV': {
            text: 'En av Tangokompaniets grundare. Har undervisat och turnerat med Daniel i alla nordiska, \
                flera europeiska länder och i Japan. Tycker om det lekfulla, det meditativa \
                och det kreativa i tangodansen.'
        },        
        'EN': {
            text: 'No translation to English', 
        },  
        'ES': {
            text: 'Sin traduccíon al esopañol', 
        },
    },

];

export default tkTeachers;

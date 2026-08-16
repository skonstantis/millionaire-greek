const LEVELS = [{"amount":100,"safe":false,"lockMs":7000,"difficulty":1},{"amount":200,"safe":false,"lockMs":8000,"difficulty":1},{"amount":300,"safe":false,"lockMs":9000,"difficulty":2},{"amount":400,"safe":false,"lockMs":10000,"difficulty":2},{"amount":500,"safe":true,"lockMs":11000,"difficulty":2},{"amount":1000,"safe":false,"lockMs":12500,"difficulty":3},{"amount":2000,"safe":false,"lockMs":14000,"difficulty":3},{"amount":3000,"safe":false,"lockMs":15500,"difficulty":3},{"amount":4000,"safe":false,"lockMs":17000,"difficulty":3},{"amount":5000,"safe":true,"lockMs":19000,"difficulty":4},{"amount":7500,"safe":false,"lockMs":20250,"difficulty":4},{"amount":10000,"safe":false,"lockMs":21500,"difficulty":4},{"amount":20000,"safe":false,"lockMs":24000,"difficulty":4},{"amount":30000,"safe":false,"lockMs":27000,"difficulty":5},{"amount":100000,"safe":false,"lockMs":30000,"difficulty":5}];
const LETTERS = ["A","B","Γ","Δ"];
const STORAGE_KEY = "millionaireHostRecentV16";

const $ = id => document.getElementById(id);

const QUESTION_BANK = {"100":[{"id":"src-617","question":"Ποια φιγούρα τοποθετείται συνήθως πάνω σε μια γαμήλια τούρτα;","options":["Πεθερά και κουνιάδα","Καρδιά και βέλος","Νύφη και γαμπρός","Γάτα και σκύλος"],"correct":2,"sourceId":"617","sourceLevel":1,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Νύφη και γαμπρός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1857","question":"Σε μια κλήρωση, πώς ονομάζεται συνήθως το βραβείο για όσους χάνουν οριακά το μεγάλο έπαθλο;","options":["Ηθικού","Παρηγοριάς","Συγχαρητηρίων","Προκαταβολής"],"correct":1,"sourceId":"1857","sourceLevel":1,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Παρηγοριάς». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-766","question":"Σε ποια πόλη βρίσκεσαι αν μετακινείσαι με κλασικά μαύρα ταξί και κόκκινα διώροφα λεωφορεία;","options":["Νέα Υόρκη","Λονδίνο","Παρίσι","Πράγα"],"correct":1,"sourceId":"766","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η πόλη που ζητείται είναι «Λονδίνο». Το χαρακτηριστικό της ερώτησης είναι ένα από τα στοιχεία με τα οποία αναγνωρίζεται η συγκεκριμένη πόλη."},{"id":"src-922","question":"Σε ποια χώρα ανήκει η κινηματογραφική βιομηχανία του Bollywood;","options":["Ινδία","Ιαπωνία","Ιράν","Κίνα"],"correct":0,"sourceId":"922","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ινδία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-410","question":"Πώς ονομάζεται συνήθως ένα κατάστημα που πουλά προϊόντα επώνυμων εταιρειών σε μειωμένες τιμές;","options":["Πολυκατάστημα","Outlet","Franchise","Duty Free"],"correct":1,"sourceId":"410","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Outlet». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-606","question":"Πώς ονομάζεται το μικρόσωμο άλογο που είναι ιδιαίτερα δημοφιλές στα παιδιά;","options":["Πουλάρι","Πόνι","Φοράδα","Γαϊδουράκι"],"correct":1,"sourceId":"606","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Πόνι». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-844","question":"Σε ποιο άθλημα δύο μεγαλόσωμοι παλαιστές προσπαθούν να βγάλουν ο ένας τον άλλον έξω από έναν κυκλικό χώρο;","options":["Πάλη με καμήλες","Σούμο","Επαγγελματική πάλη","Ταυρομαχία"],"correct":1,"sourceId":"844","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σούμο». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-892","question":"Τι σχήμα έχει το ρινγκ της πυγμαχίας;","options":["Τετράγωνο","Κύκλο","Οβάλ","Ορθογώνιο"],"correct":0,"sourceId":"892","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Τετράγωνο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-963","question":"Κατά πόσες μοίρες πρέπει να στραφεί κάποιος για να κοιτάζει ακριβώς προς την αντίθετη κατεύθυνση;","options":["45°","90°","180°","360°"],"correct":2,"sourceId":"963","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «180°». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-1109","question":"Σε ποιο άθλημα χρησιμοποιούνται κορίνες;","options":["Χόκεϊ","Γκολφ","Κρίκετ","Μπόουλινγκ"],"correct":3,"sourceId":"1109","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μπόουλινγκ». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-1348","question":"Ποιο άθλημα αρχίζει με τζάμπολ στο κέντρο του γηπέδου;","options":["Μπάσκετ","Τένις","Βόλεϊ","Ποδόσφαιρο"],"correct":0,"sourceId":"1348","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μπάσκετ». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-1441","question":"Σε ποια ταινία ένας γιγάντιος γορίλας ανεβαίνει στο Empire State Building;","options":["Godzilla","King Kong","Hulk","Batman"],"correct":1,"sourceId":"1441","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η ταινία είναι «King Kong». Η σκηνή, η φράση ή η υπόθεση που αναφέρεται είναι χαρακτηριστικά συνδεδεμένη με αυτήν."},{"id":"src-1496","question":"Ποιος ήρωας παραμυθιού δεν βρίσκει βοήθεια όταν κινδυνεύει πραγματικά επειδή είχε πει πολλές φορές ψέματα;","options":["Ο ψεύτης βοσκός","Το κοριτσάκι με τα σπίρτα","Ο αυλητής του Χάμελιν","Ο Παπουτσωμένος Γάτος"],"correct":0,"sourceId":"1496","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ο ψεύτης βοσκός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1860","question":"Ποιος χαρακτήρας κινουμένων σχεδίων λατρεύει τα λαζάνια και μισεί τις Δευτέρες;","options":["Mickey Mouse","SpongeBob","Tweety","Garfield"],"correct":3,"sourceId":"1860","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Garfield». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2090","question":"Τι μεταφέρει συνήθως ένα φορτηγό με μεγάλο περιστρεφόμενο κυλινδρικό κάδο;","options":["Τσιμέντο","Βενζίνη","Μπογιά","Πόσιμο νερό"],"correct":0,"sourceId":"2090","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Τσιμέντο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2148","question":"Ποιο γράμμα αντιστοιχεί συνήθως στον βαλέ μιας τράπουλας;","options":["A","J","Q","K"],"correct":1,"sourceId":"2148","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «J». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2175","question":"Σε ποιον τομέα ασκείται κάποιος που κάνει μαθήματα φωνητικής;","options":["Ζωγραφική","Γλυπτική","Λογοτεχνία","Μουσική"],"correct":3,"sourceId":"2175","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μουσική». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2205","question":"Με ποια κινηματογραφική σειρά έχει συνδεθεί η φράση «αυτό το μήνυμα θα αυτοκαταστραφεί»;","options":["Mission: Impossible","James Bond","The Usual Suspects","Star Trek"],"correct":0,"sourceId":"2205","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Mission: Impossible». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2210","question":"Σε ποιο ζώο είχε τη μορφή το τέχνασμα μέσα στο οποίο κρύφτηκαν Έλληνες πολεμιστές στην Τροία;","options":["Γάιδαρο","Άλογο","Ρινόκερο","Γάτα"],"correct":1,"sourceId":"2210","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Άλογο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2230","question":"Ποια χώρα είναι γνωστή τόσο για τον Ντιέγκο Μαραντόνα όσο και για το τάνγκο;","options":["Πορτογαλία","Βραζιλία","Αργεντινή","Ισπανία"],"correct":2,"sourceId":"2230","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αργεντινή». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-425","question":"Πώς αποκαλείται ένα πρόσωπο που αποτελεί αντικείμενο θαυμασμού και πρότυπο για άλλους;","options":["Αρχηγός","Βετεράνος","CEO","Ίνδαλμα"],"correct":3,"sourceId":"425","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ίνδαλμα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-814","question":"Ποιος κλασικός συνδυασμός χρωμάτων χρησιμοποιήθηκε ευρέως σε παλιά αναγλυφικά γυαλιά 3D;","options":["Κίτρινο-μπλε","Κόκκινο-μπλε","Μαύρο-λευκό","Μπλε-πράσινο"],"correct":1,"sourceId":"814","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κόκκινο-μπλε». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1286","question":"Ποιος καρπός έχει πράσινο εξωτερικό περίβλημα όταν συλλέγεται από το δέντρο;","options":["Καρύδι","Κουκουνάρι","Τζίτζιφο","Χαρούπι"],"correct":0,"sourceId":"1286","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Καρύδι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1296","question":"Σε ποιο από τα παρακάτω παραμύθια το φιλί δεν αποτελεί βασικό στοιχείο της κατάληξης;","options":["Ο Πρίγκιπας Βάτραχος","Η Ωραία Κοιμωμένη","Η Κοκκινοσκουφίτσα","Η Χιονάτη"],"correct":2,"sourceId":"1296","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Η Κοκκινοσκουφίτσα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1349","question":"Αν σταθείς ανάμεσα σε δύο παράλληλους καθρέφτες που κοιτάζουν ο ένας τον άλλον, πόσες εικόνες φαίνεται θεωρητικά να δημιουργούνται;","options":["1","2","4","Άπειρες"],"correct":3,"sourceId":"1349","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Άπειρες». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1369","question":"Πού συναντάμε συχνότερα μια περιστρεφόμενη μπάλα καλυμμένη με μικρούς καθρέφτες;","options":["Ντισκοτέκ","Μουσείο","Θέατρο","Τσίρκο"],"correct":0,"sourceId":"1369","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ντισκοτέκ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1516","question":"Με τι εφαρμόζεται ο βελονισμός;","options":["Βελόνες","Μαγνήτες","Πέτρες","Βεντούζες"],"correct":0,"sourceId":"1516","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βελόνες». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1657","question":"Τι αφήνουν πίσω τους ο Χάνσελ και η Γκρέτελ για να προσπαθήσουν να βρουν τον δρόμο τους στο δάσος;","options":["Κάστανα","Μπισκότα","Καραμέλες","Ψίχουλα ψωμιού"],"correct":3,"sourceId":"1657","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ψίχουλα ψωμιού». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1736","question":"Ποια πόλη αναφέρεται στην παροιμιώδη φράση ότι «δεν χτίστηκε σε μία μέρα»;","options":["Ρώμη","Κωνσταντινούπολη","Λονδίνο","Παρίσι"],"correct":0,"sourceId":"1736","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η πόλη που ζητείται είναι «Ρώμη». Το χαρακτηριστικό της ερώτησης είναι ένα από τα στοιχεία με τα οποία αναγνωρίζεται η συγκεκριμένη πόλη."},{"id":"src-1832","question":"Ποιος χαρακτήρας κόμικ κοιμάται συχνά πάνω στη σκεπή του σκυλόσπιτού του;","options":["Garfield","Tweety","Snoopy","Rin Tin Tin"],"correct":2,"sourceId":"1832","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Snoopy». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2072","question":"Με ποιον επαγγελματικό χώρο συνδέεται το σύμβολο της ράβδου με το φίδι;","options":["Ιατρική","Νομική","Εκπαίδευση","Τέχνη"],"correct":0,"sourceId":"2072","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ιατρική». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2176","question":"Ποιον υπερήρωα μπορεί να αποδυναμώσει ο κρυπτονίτης;","options":["He-Man","Spider-Man","Superman","Batman"],"correct":2,"sourceId":"2176","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Superman». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2186","question":"Σε ποιο άθλημα χρησιμοποιείται ευρέως ο όρος «Grand Slam»;","options":["Αγώνες αυτοκινήτου","Στίβος","Γκολφ","Τένις"],"correct":3,"sourceId":"2186","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Τένις». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-2232","question":"Ποιο ιαπωνικό φαγητό έχει παραλλαγές όπως nigiri και California roll;","options":["Σούσι","Τάκο","Wrap","Noodles"],"correct":0,"sourceId":"2232","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σούσι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1297","question":"Ποιος αριθμητικός κωδικός εμφανίζεται συνήθως στο διαδίκτυο όταν μια σελίδα δεν βρέθηκε;","options":["100","404","500","505"],"correct":1,"sourceId":"1297","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «404». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1402","question":"Ποιο όσπριο αποτελεί τη βασική πρώτη ύλη του χούμους;","options":["Σιμιγδάλι","Κουκιά","Ρεβίθια","Πλιγούρι"],"correct":2,"sourceId":"1402","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ρεβίθια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1418","question":"Σε ποια χώρα διεξάγεται η ποδοσφαιρική La Liga;","options":["Αγγλία","Ισπανία","Γαλλία","Ιταλία"],"correct":1,"sourceId":"1418","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ισπανία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1505","question":"Με ποια χώρα συνδέονται χαρακτηριστικά τα tacos και το sombrero;","options":["Λιβύη","Ινδία","Αργεντινή","Μεξικό"],"correct":3,"sourceId":"1505","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μεξικό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1517","question":"Τι τρώει συνήθως ο Super Mario για να αποκτήσει επιπλέον δύναμη ή μέγεθος;","options":["Μήλο","Μανιτάρι","Κουκουνάρι","Κολοκύθα"],"correct":1,"sourceId":"1517","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μανιτάρι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1546","question":"Τι σχήμα έχει συνήθως το ταμπλό πίσω από το καλάθι στο μπάσκετ;","options":["Ορθογώνιο","Τετράγωνο","Κύκλο","Τρίγωνο"],"correct":0,"sourceId":"1546","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ορθογώνιο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2073","question":"Η Mary Jane Watson είναι γνωστή ως ερωτικό ενδιαφέρον ποιου υπερήρωα;","options":["Superman","Spider-Man","Batman","King Kong"],"correct":1,"sourceId":"2073","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Spider-Man». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1892","question":"Με ποιο λογοτεχνικό είδος είναι κυρίως συνδεδεμένη η Agatha Christie;","options":["Τρόμου","Αστυνομικό","Ρομαντικό","Φαντασίας"],"correct":1,"sourceId":"1892","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αστυνομικό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-645","question":"Ποιο χειριστήριο έχει συνδεθεί κλασικά με τα βιντεοπαιχνίδια;","options":["Modem","Port","Decoder","Joystick"],"correct":3,"sourceId":"645","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Joystick». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-652","question":"Πώς ονομάζεται μια πολύ μεγάλη και ανεπτυγμένη πόλη με σημαντικό οικονομικό και πολιτιστικό ρόλο;","options":["Habitat","Μητρόπολη","Επαρχία","Γκέτο"],"correct":1,"sourceId":"652","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Μητρόπολη». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-654","question":"Σε ποια κινηματογραφική σειρά είναι βασικός ήρωας ο Luke Skywalker;","options":["Armageddon","Alien","Star Trek","Star Wars"],"correct":3,"sourceId":"654","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Star Wars». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-658","question":"Πώς ονομάζονται αθλήματα υψηλού ρίσκου όπως η αναρρίχηση και το αλεξίπτωτο πλαγιάς;","options":["Περιθωριακά αθλήματα","Extreme sports","Γρήγορα αθλήματα","Επικίνδυνα παιχνίδια"],"correct":1,"sourceId":"658","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Extreme sports». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-719","question":"Ποιο χημικό στοιχείο βρίσκεται σε μεγάλη ποσότητα στα οστά, στα δόντια και στα κελύφη αυγών;","options":["Φώσφορος","Ιώδιο","Ασβέστιο","Σίδηρος"],"correct":2,"sourceId":"719","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το χημικό στοιχείο είναι «Ασβέστιο». Η παρουσία ή η χρήση του που αναφέρεται στην ερώτηση εξηγεί γιατί αυτή είναι η σωστή επιλογή."},{"id":"src-748","question":"Σε ποια γιορτή τα παιδιά πηγαίνουν από πόρτα σε πόρτα λέγοντας «trick or treat»;","options":["Πάσχα","Πεσάχ","Halloween","Thanksgiving"],"correct":2,"sourceId":"748","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Halloween». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-862","question":"Τι ζώο είναι ο Scrooge McDuck;","options":["Κουνέλι","Σκύλος","Πάπια","Δρυοκολάπτης"],"correct":2,"sourceId":"862","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το ζώο είναι «Πάπια». Το γνώρισμα που περιγράφεται στην ερώτηση είναι χαρακτηριστικό που βοηθά στην αναγνώρισή του."},{"id":"src-869","question":"Ποιο κομμάτι του σκακιού πρέπει να προστατευτεί επειδή το ματ σε αυτό τελειώνει την παρτίδα;","options":["Βασιλιάς","Ίππος","Αξιωματικός","Βασίλισσα"],"correct":0,"sourceId":"869","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βασιλιάς». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-908","question":"Ποια από τις παρακάτω ταινίες βασίζεται σε ιστορικό γεγονός του οποίου την κατάληξη γνωρίζουμε ήδη πριν τη δούμε;","options":["Avatar","Titanic","The Matrix","Pirates of the Caribbean"],"correct":1,"sourceId":"908","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Titanic». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-920","question":"Ποιο όπλο είναι χαρακτηριστικό του σύμπαντος του Star Wars;","options":["Πύρινη σφαίρα","Κατάνα","Νουντσάκου","Φωτόσπαθο"],"correct":3,"sourceId":"920","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Φωτόσπαθο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-927","question":"Πόσοι είναι οι κύκλοι στο σύμβολο των Ολυμπιακών Αγώνων;","options":["3","5","7","9"],"correct":1,"sourceId":"927","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «5». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-936","question":"Πόσες τρύπες για τα δάχτυλα έχει συνήθως μια κλασική μπάλα μπόουλινγκ;","options":["1","2","3","5"],"correct":2,"sourceId":"936","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «3». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-1011","question":"Τι πωλείται κυρίως σε ένα κατάστημα bijouterie;","options":["Παιχνίδια","Υφάσματα","Κοσμήματα και αξεσουάρ","Αρώματα"],"correct":2,"sourceId":"1011","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κοσμήματα και αξεσουάρ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1057","question":"Τι σημαίνει η καρό σημαία στους αγώνες αυτοκινήτου;","options":["Ακύρωση του αγώνα","Ατύχημα","Διάλειμμα","Τερματισμό του αγώνα"],"correct":3,"sourceId":"1057","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Τερματισμό του αγώνα». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"geo-menti-med-sea","question":"Ποια θάλασσα βρίσκεται ανάμεσα στην Ευρώπη και την Αφρική;","options":["Βαλτική Θάλασσα","Μεσόγειος Θάλασσα","Καραϊβική Θάλασσα","Βόρεια Θάλασσα"],"correct":1,"trivia":"Η Μεσόγειος χωρίζει τη νότια Ευρώπη από τη βόρεια Αφρική και συνδέεται με τον Ατλαντικό μέσω του Στενού του Γιβραλτάρ.","sourceId":"general-adapted-mediterranean","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-beijing","question":"Ποια είναι η πρωτεύουσα της Κίνας;","options":["Σαγκάη","Χονγκ Κονγκ","Πεκίνο","Γκουανγκζού"],"correct":2,"trivia":"Το Πεκίνο είναι η πρωτεύουσα της Κίνας. Εκεί βρίσκονται, μεταξύ άλλων, η Απαγορευμένη Πόλη και η πλατεία Τιενανμέν.","sourceId":"capital-beijing","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-brazil-largest-sa","question":"Ποια είναι η μεγαλύτερη χώρα της Νότιας Αμερικής σε έκταση;","options":["Αργεντινή","Βραζιλία","Περού","Χιλή"],"correct":1,"trivia":"Η Βραζιλία καλύπτει σχεδόν το μισό της έκτασης της Νότιας Αμερικής και είναι μακράν η μεγαλύτερη χώρα της ηπείρου.","sourceId":"countries-brazil-largest","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-atlantic","question":"Ποιος ωκεανός βρίσκεται ανάμεσα στην Ευρώπη και τη Βόρεια Αμερική;","options":["Ινδικός","Αρκτικός","Ατλαντικός","Ειρηνικός"],"correct":2,"trivia":"Ο Ατλαντικός Ωκεανός χωρίζει την Ευρώπη και την Αφρική από την Αμερικανική ήπειρο και είναι ο δεύτερος μεγαλύτερος ωκεανός της Γης.","sourceId":"easy-12","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-russia-largest","question":"Ποια είναι η μεγαλύτερη χώρα του κόσμου σε έκταση;","options":["Καναδάς","Κίνα","ΗΠΑ","Ρωσία"],"correct":3,"trivia":"Η Ρωσία είναι η μεγαλύτερη χώρα στον κόσμο σε έκταση και απλώνεται σε Ευρώπη και Ασία.","sourceId":"countries-1","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-italy-boot","question":"Ποια χώρα είναι γνωστή για το χαρακτηριστικό σχήμα «μπότας» στον χάρτη;","options":["Ιταλία","Πορτογαλία","Κροατία","Ελλάδα"],"correct":0,"trivia":"Η ιταλική χερσόνησος έχει χαρακτηριστικό σχήμα που θυμίζει μπότα, ένα από τα πιο αναγνωρίσιμα περιγράμματα χωρών.","sourceId":"easy-18","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-great-barrier","question":"Σε ποια χώρα βρίσκεται ο Μεγάλος Κοραλλιογενής Ύφαλος;","options":["Ινδονησία","Αυστραλία","Μεξικό","Νότια Αφρική"],"correct":1,"trivia":"Ο Μεγάλος Κοραλλιογενής Ύφαλος βρίσκεται ανοικτά του Κουίνσλαντ στην Αυστραλία και αποτελεί το μεγαλύτερο σύστημα κοραλλιογενών υφάλων στον κόσμο.","sourceId":"countries-16","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-pacific-largest","question":"Ποιος είναι ο μεγαλύτερος ωκεανός της Γης;","options":["Ατλαντικός","Ινδικός","Αρκτικός","Ειρηνικός"],"correct":3,"trivia":"Ο Ειρηνικός είναι ο μεγαλύτερος και βαθύτερος ωκεανός του πλανήτη, καταλαμβάνοντας μεγαλύτερη έκταση από όλες τις χερσαίες μάζες μαζί.","sourceId":"easy-1","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"}],"200":[{"id":"src-1378","question":"Τι πετά η νύφη πίσω της σε έναν γάμο, σύμφωνα με το γνωστό έθιμο;","options":["Πέπλο","Βέρα","Ανθοδέσμη","Πιστοποιητικό γάμου"],"correct":2,"sourceId":"1378","sourceLevel":2,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ανθοδέσμη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1155","question":"Στα καρτούν, τι συνήθως γυρίζει γύρω από το κεφάλι κάποιου που έχει χτυπήσει;","options":["Αστραπές","Ερωτηματικά","Καρδιές","Αστέρια"],"correct":3,"sourceId":"1155","sourceLevel":2,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αστέρια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-773","question":"Με ποια χώρα ασχολείται κυρίως η Σινολογία;","options":["Κίνα","Αίγυπτο","Ρωσία","Ιράν"],"correct":0,"sourceId":"773","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κίνα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1763","question":"Ποια χώρα έχει ως επίσημη ονομασία «Ελληνική Δημοκρατία»;","options":["Λίβανος","Ιταλία","Βόρεια Μακεδονία","Ελλάδα"],"correct":3,"sourceId":"1763","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ελλάδα». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-952","question":"Με ποια μονάδα αναφέρεται συνήθως η ποσότητα του αργού πετρελαίου στις διεθνείς αγορές;","options":["Μπιτόνι","Βαρέλι αποθήκευσης","Βαρέλι","Νταμιτζάνα"],"correct":2,"sourceId":"952","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βαρέλι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-977","question":"Ποιο από τα παρακάτω δίνεται παραδοσιακά ως λιχουδιά σε άλογα;","options":["Κύβος ζάχαρης","Σταφύλι","Λουκούμι","Φουντούκι"],"correct":0,"sourceId":"977","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κύβος ζάχαρης». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1909","question":"Σε ένα βιβλίο, ένας μικρός αριθμός πάνω δεξιά από μια λέξη συνήθως παραπέμπει σε τι;","options":["Βιβλιογραφία","Υποσημείωση","Περιεχόμενα","Λεξικό"],"correct":1,"sourceId":"1909","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Υποσημείωση». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2040","question":"Πού εργάζεται συνήθως ένας χρηματιστής;","options":["Χρηματιστήριο","Λιμάνι","Δικαστήριο","Βιβλιοθήκη"],"correct":0,"sourceId":"2040","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Χρηματιστήριο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-607","question":"Πώς ονομάζεται η ειδική γλώσσα και ορολογία που χρησιμοποιεί μια επαγγελματική ή κοινωνική ομάδα;","options":["Ανέκδοτο","Ετυμολογία","Αλληγορία","Ζαργκόν"],"correct":3,"sourceId":"607","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Ζαργκόν». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-946","question":"Σε ποια χώρα διαδραματίζεται κυρίως η ταινία «Slumdog Millionaire»;","options":["Κίνα","Ρωσία","Ινδία","Βραζιλία"],"correct":2,"sourceId":"946","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ινδία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1966","question":"Ποιος φίλος του Αστερίξ επιμένει ότι δεν είναι χοντρός αλλά «γεροδεμένος»;","options":["Οβελίξ","Ιντεφίξ","Πανοραμίξ","Μαζεστίξ"],"correct":0,"sourceId":"1966","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Οβελίξ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-439","question":"Ποιο ζώο κατασκευάζει φράγματα χρησιμοποιώντας κλαδιά και κορμούς;","options":["Σκαντζόχοιρος","Ιπποπόταμος","Κάστορας","Βούβαλος"],"correct":2,"sourceId":"439","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το ζώο είναι «Κάστορας». Το γνώρισμα που περιγράφεται στην ερώτηση είναι χαρακτηριστικό που βοηθά στην αναγνώρισή του."},{"id":"geo-nibble-canberra","question":"Ποια είναι η πρωτεύουσα της Αυστραλίας;","options":["Σίδνεϊ","Μελβούρνη","Καμπέρα","Περθ"],"correct":2,"trivia":"Η Καμπέρα επιλέχθηκε ως συμβιβασμός ανάμεσα στις αντίπαλες υποψηφιότητες του Σίδνεϊ και της Μελβούρνης και έγινε επίσημα πρωτεύουσα το 1913.","sourceId":"capital-canberra","sourceLevel":null,"source":"Nibble — Geography Trivia (2026)","sourceUrl":"https://nibble-app.com/blog/geography-trivia"},{"id":"geo-parade-everest-range","question":"Σε ποια οροσειρά βρίσκεται το Έβερεστ;","options":["Άνδεις","Άλπεις","Ιμαλάια","Βραχώδη Όρη"],"correct":2,"trivia":"Το Έβερεστ βρίσκεται στα Ιμαλάια, στα σύνορα Νεπάλ και Θιβέτ/Κίνας, και είναι η υψηλότερη κορυφή πάνω από τη στάθμη της θάλασσας.","sourceId":"planet-16","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-parade-polar-bears","question":"Σε ποια περιοχή του κόσμου ζουν φυσικά οι πολικές αρκούδες;","options":["Ανταρκτική","Αρκτική","Παταγονία","Σιβηρία μόνο"],"correct":1,"trivia":"Οι πολικές αρκούδες είναι ζώα της Αρκτικής. Δεν ζουν φυσικά στην Ανταρκτική, όπου συναντώνται οι πιγκουίνοι.","sourceId":"animals-47","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-menti-vatican-smallest","question":"Ποια είναι η μικρότερη χώρα του κόσμου;","options":["Μονακό","Σαν Μαρίνο","Βατικανό","Λιχτενστάιν"],"correct":2,"trivia":"Το Κράτος της Πόλης του Βατικανού βρίσκεται μέσα στη Ρώμη και είναι το μικρότερο ανεξάρτητο κράτος του κόσμου σε έκταση.","sourceId":"countries-7","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-parade-fondue","question":"Με ποια χώρα συνδέεται παραδοσιακά η προέλευση του φοντί τυριού;","options":["Βέλγιο","Ελβετία","Δανία","Αυστρία"],"correct":1,"trivia":"Το φοντί θεωρείται εμβληματικό ελβετικό πιάτο, ιδιαίτερα συνδεδεμένο με τις αλπικές περιοχές και το λιωμένο τυρί.","sourceId":"countries-29","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"}],"300":[{"id":"src-1975","question":"Ποιο από τα παρακάτω είναι ποικιλία μήλου;","options":["Τσάρλιστον","Νατσούμα","Golden","Washington"],"correct":2,"sourceId":"1975","sourceLevel":3,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Golden». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-790","question":"Ποιο παιχνίδι παίζεται με 28 ορθογώνια πλακίδια που έχουν κουκκίδες;","options":["Ντάμα","Οκέι","Μπιλιάρδο","Ντόμινο"],"correct":3,"sourceId":"790","sourceLevel":3,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ντόμινο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1388","question":"Σε ποια χώρα είναι παραδοσιακά συνηθισμένο να βάζουν γάλα στο τσάι;","options":["Αγγλία","Γερμανία","Ρωσία","Ιταλία"],"correct":0,"sourceId":"1388","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αγγλία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-2178","question":"Σε ποια χώρα εκδίδεται η εφημερίδα Libération;","options":["Ιταλία","Γαλλία","Πορτογαλία","Ισπανία"],"correct":1,"sourceId":"2178","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γαλλία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-504","question":"Πώς ονομάζεται το μακροχρόνιο στεγαστικό δάνειο που χορηγείται συνήθως για αγορά κατοικίας;","options":["Leasing","Factoring","Mortgage","Έκδοση χρήματος"],"correct":2,"sourceId":"504","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Mortgage». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-541","question":"Σε ποιο άθλημα βαθμολογείται και η καλλιτεχνική παρουσίαση;","options":["Πυγμαχία","Τένις","Καλλιτεχνικό πατινάζ","Ξιφασκία"],"correct":2,"sourceId":"541","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Καλλιτεχνικό πατινάζ». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-1259","question":"Στο ποδόσφαιρο, τι κάνουν συχνά οι παίκτες από ευ αγωνίζεσθαι όταν υπάρχει τραυματισμένος αντίπαλος;","options":["Βγάζουν την μπάλα πλάγιο","Πιάνουν την μπάλα με τα χέρια","Δίνουν την μπάλα στον διαιτητή","Γυρίζουν την μπάλα στον τερματοφύλακα"],"correct":0,"sourceId":"1259","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βγάζουν την μπάλα πλάγιο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1271","question":"Ποια μορφή άσκησης χρησιμοποιεί συχνά μια μεγάλη ελαστική μπάλα γυμναστικής;","options":["Αϊκίντο","Γιόγκα","Πιλάτες","Ρέικι"],"correct":2,"sourceId":"1271","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Πιλάτες». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1308","question":"Ποιο μπαχαρικό με έντονο άρωμα χρησιμοποιείται συχνά σε κρέατα και κεφτέδες;","options":["Σαφράν","Μαυροκούκι","Κύμινο","Σουμάκ"],"correct":2,"sourceId":"1308","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κύμινο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1470","question":"Με πόσα δάχτυλα γίνεται παραδοσιακά ο προσκοπικός χαιρετισμός;","options":["2","3","4","5"],"correct":1,"sourceId":"1470","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «3». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-1947","question":"Σύμφωνα με την τυπική εθιμοτυπία, με ποια σειρά χρησιμοποιούνται τα μαχαιροπίρουνα γύρω από το πιάτο;","options":["Από έξω προς τα μέσα","Από μέσα προς τα έξω","Από το μικρότερο στο μεγαλύτερο","Από πάνω προς τα κάτω"],"correct":0,"sourceId":"1947","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Από έξω προς τα μέσα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1952","question":"Ποια ασύρματη τεχνολογία μικρής εμβέλειας χρησιμοποιείται ευρέως για σύνδεση κινητών συσκευών;","options":["Android","Backup","Bluetooth","Navigation"],"correct":2,"sourceId":"1952","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Bluetooth». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2015","question":"Οι όροι αλπικό, σλάλομ και δίαθλο συνδέονται κυρίως με ποιο χειμερινό άθλημα;","options":["Σκι","Έλκηθρο","Χόκεϊ επί πάγου","Καλλιτεχνικό πατινάζ"],"correct":0,"sourceId":"2015","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σκι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2047","question":"Σε ποιο επάγγελμα χρησιμοποιείται ιδιαίτερα συχνά ορολογία λατινικής προέλευσης;","options":["Εκπαιδευτικός","Δημοσιογράφος","Γιατρός","Πιλότος"],"correct":2,"sourceId":"2047","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γιατρός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-514","question":"Με ποια άλλη ονομασία είναι γνωστά τα βραβεία Όσκαρ;","options":["Βραβεία Ινστιτούτου","Χρυσός Φοίνικας","Βραβεία Χόλιγουντ","Βραβεία της Ακαδημίας"],"correct":3,"sourceId":"514","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βραβεία της Ακαδημίας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-523","question":"Ποιος χαρακτήρας του «Άρχοντα των Δαχτυλιδιών» αποκαλεί το Δαχτυλίδι «πολύτιμό μου»;","options":["Φρόντο","Γκάνταλφ","Γκόλουμ","Άραγκορν"],"correct":2,"sourceId":"523","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γκόλουμ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-535","question":"Σε ποιο πεδίο ενός email βάζουμε συνήθως επιπλέον παραλήπτες που θέλουμε να λάβουν αντίγραφο;","options":["Forward","CC","Spam","Attach"],"correct":1,"sourceId":"535","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «CC». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-591","question":"Σε ποια ταινία συνδέθηκε ο Arnold Schwarzenegger με τη φράση «I'll be back»;","options":["Rocky","Total Recall","The Terminator","Back to the Future"],"correct":2,"sourceId":"591","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η ταινία είναι «The Terminator». Η σκηνή, η φράση ή η υπόθεση που αναφέρεται είναι χαρακτηριστικά συνδεδεμένη με αυτήν."},{"id":"src-979","question":"Πώς ονομάζεται η κούκλα που στη λαϊκή εικόνα της βουντού μαγείας τρυπιέται με καρφίτσες για να επηρεαστεί ένα πρόσωπο;","options":["Tattoo","Chucky","Κούκλα βουντού","Ματριόσκα"],"correct":2,"sourceId":"979","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Κούκλα βουντού». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-986","question":"Ποιον αριθμό έχει η μαύρη μπάλα στο αμερικανικό μπιλιάρδο 8-ball;","options":["2","4","6","8"],"correct":3,"sourceId":"986","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «8». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1434","question":"Πού συναντάμε στρατιώτες-τραπουλόχαρτα, μια χαμογελαστή γάτα και έναν Τρελοκαπελά;","options":["Στο δάσος του Σέργουντ","Στην Gotham City","Στον Κρύπτον","Στη Χώρα των Θαυμάτων"],"correct":3,"sourceId":"1434","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Στη Χώρα των Θαυμάτων». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1491","question":"Σε ποιο λογοτεχνικό σύμπαν βρίσκεται η Μέση Γη;","options":["Harry Potter","Ο Μάγος του Οζ","Ο Κώδικας Ντα Βίντσι","Ο Άρχοντας των Δαχτυλιδιών"],"correct":3,"sourceId":"1491","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ο Άρχοντας των Δαχτυλιδιών». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1536","question":"Ποια δύο χρώματα έχει το κλασικό σύμβολο του γιν και γιανγκ;","options":["Κόκκινο και μαύρο","Ροζ και μπλε","Μπλε και λευκό","Μαύρο και λευκό"],"correct":3,"sourceId":"1536","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μαύρο και λευκό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1882","question":"Ποιο γλύκισμα ψήνουν συχνά σε ξυλάκι πάνω από φωτιά κατασκήνωσης στις ΗΠΑ;","options":["Donut","Macaron","Marshmallow","Pancake"],"correct":2,"sourceId":"1882","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Marshmallow». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-420","question":"Με ποιον άνθρωπο συνδέθηκε ιστορικά η φράση «The Eagle has landed»;","options":["Neil Armstrong","Harry S. Truman","Diego Maradona","George Patton"],"correct":0,"sourceId":"420","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Neil Armstrong». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2034","question":"Ποια ταινία αφηγείται τη ζωή ενός άνδρα που, χωρίς να το γνωρίζει, μεταδίδεται συνεχώς από ένα γιγάντιο τηλεοπτικό στούντιο;","options":["EdTV","The Truman Show","Forrest Gump","The Terminal"],"correct":1,"sourceId":"2034","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η ταινία είναι «The Truman Show». Η σκηνή, η φράση ή η υπόθεση που αναφέρεται είναι χαρακτηριστικά συνδεδεμένη με αυτήν."},{"id":"src-2199","question":"Ποιος σκηνοθέτησε τα «Titanic», «The Terminator» και «Avatar»;","options":["George Lucas","Quentin Tarantino","Steven Spielberg","James Cameron"],"correct":3,"sourceId":"2199","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο James Cameron. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-638","question":"Σε ποιο παιχνίδι ρίχνουμε μικρά βέλη σε έναν κυκλικό στόχο με ομόκεντρους δακτυλίους;","options":["Μπόουλινγκ","Πόλο","Σκουός","Βελάκια"],"correct":3,"sourceId":"638","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βελάκια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-666","question":"Ποιος οικιακός υπολογιστής της δεκαετίας του 1980 έγινε διάσημος χρησιμοποιώντας συχνά κασέτες για φόρτωση προγραμμάτων;","options":["Game Boy","Pac-Man","Super Mario","Commodore 64"],"correct":3,"sourceId":"666","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Commodore 64». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-853","question":"Ποιο παραμύθι έχει ως ήρωες τέσσερα ζώα που στέκονται το ένα πάνω στο άλλο και σχηματίζουν μια μουσική ομάδα;","options":["Οι Μουσικοί της Βρέμης","Η Φάρμα των Ζώων","Ο Παπουτσωμένος Γάτος","Οι Αδελφοί Καραμαζόφ"],"correct":0,"sourceId":"853","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Οι Μουσικοί της Βρέμης». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-864","question":"Ποιος σκηνοθέτησε την κινηματογραφική τριλογία «Ο Άρχοντας των Δαχτυλιδιών»;","options":["George Lucas","David Lynch","Peter Jackson","Kim Bartson"],"correct":2,"sourceId":"864","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Peter Jackson. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1016","question":"Ποια συσκευή ήταν ιδιαίτερα συνηθισμένο τη δεκαετία του 1990 να συναρμολογείται από εξαρτήματα διαφορετικών κατασκευαστών;","options":["Τηλεόραση","Ψυγείο","Υπολογιστής","Ραδιόφωνο"],"correct":2,"sourceId":"1016","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Υπολογιστής». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1018","question":"Πόσα διαφορετικά είδη κομματιών υπάρχουν στο σκάκι;","options":["5","6","7","8"],"correct":1,"sourceId":"1018","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «6». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-1028","question":"Ποιος έγραψε την «Άννα Καρένινα»;","options":["Gogol","Tolstoy","Chekhov","Gorky"],"correct":1,"sourceId":"1028","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Tolstoy. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-1043","question":"Ποιος σκηνοθέτησε τα «Vertigo», «The Birds» και «Rear Window»;","options":["Roman Polanski","John Carpenter","Alfred Hitchcock","Stanley Kubrick"],"correct":2,"sourceId":"1043","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Alfred Hitchcock. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1500","question":"Πώς ονομάζεται το παιχνίδι ή χορός όπου οι συμμετέχοντες περνούν κάτω από μια οριζόντια μπάρα που κατεβαίνει σταδιακά;","options":["Limbo","Polka","Bolero","Quadrille"],"correct":0,"sourceId":"1500","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Limbo». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"geo-menti-brasilia","question":"Ποια είναι η πρωτεύουσα της Βραζιλίας;","options":["Ρίο ντε Τζανέιρο","Σάο Πάολο","Μπραζίλια","Σαλβαδόρ"],"correct":2,"trivia":"Η Μπραζίλια εγκαινιάστηκε ως πρωτεύουσα το 1960. Σχεδιάστηκε ως νέα διοικητική πόλη για να μεταφέρει το κέντρο βάρους της χώρας προς το εσωτερικό.","sourceId":"capital-14","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-user-nassau","question":"Ποια είναι η πρωτεύουσα των Μπαχαμών;","options":["Μπρίτζταουν","Νασάου","Κίνγκστον","Πορτ οφ Σπέιν"],"correct":1,"trivia":"Το Νασάου βρίσκεται στο νησί New Providence και είναι το διοικητικό και εμπορικό κέντρο των Μπαχαμών.","sourceId":"capital-bahamas","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-parade-pangaea","question":"Πώς ονομάζεται η υπερήπειρος που υπήρχε πριν διαχωριστούν οι σημερινές ήπειροι;","options":["Γκοντβάνα","Πανγαία","Λαυρασία","Ατλαντίδα"],"correct":1,"trivia":"Η Πανγαία ήταν μια τεράστια υπερήπειρος που περιλάμβανε σχεδόν όλες τις σημερινές χερσαίες μάζες πριν αρχίσει να διασπάται.","sourceId":"general-31","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-buzz-archipelago","question":"Πώς ονομάζεται μια ομάδα ή αλυσίδα νησιών;","options":["Ισθμός","Αρχιπέλαγος","Δέλτα","Χερσόνησος"],"correct":1,"trivia":"Ο όρος «αρχιπέλαγος» περιγράφει μια ομάδα ή αλυσίδα νησιών. Χαρακτηριστικά παραδείγματα είναι η Ιαπωνία και οι Φιλιππίνες.","sourceId":"57","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-buzz-prime-meridian","question":"Ο πρώτος μεσημβρινός αντιστοιχεί σε ποια γεωγραφική συντεταγμένη;","options":["0° γεωγραφικού πλάτους","0° γεωγραφικού μήκους","90° βόρειου πλάτους","180° γεωγραφικού μήκους"],"correct":1,"trivia":"Ο πρώτος μεσημβρινός ορίζει το 0° γεωγραφικού μήκους και περνά από το Γκρίνουιτς του Λονδίνου.","sourceId":"126","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-menti-sahara-hot","question":"Ποια είναι η μεγαλύτερη θερμή έρημος στον κόσμο;","options":["Γκόμπι","Καλαχάρι","Σαχάρα","Ατακάμα"],"correct":2,"trivia":"Η Σαχάρα είναι η μεγαλύτερη θερμή έρημος. Αν μετρήσουμε όλες τις ερήμους ανεξαρτήτως θερμοκρασίας, μεγαλύτερη είναι η Ανταρκτική.","sourceId":"landmarks-sahara-adapted","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-parade-south-pole-colder","question":"Ποιος από τους δύο πόλους είναι κατά μέσο όρο ψυχρότερος;","options":["Βόρειος Πόλος","Νότιος Πόλος","Έχουν ίδια θερμοκρασία","Εξαρτάται μόνο από την εποχή"],"correct":1,"trivia":"Ο Νότιος Πόλος είναι ψυχρότερος επειδή βρίσκεται πάνω στην υψηλή, παγωμένη ήπειρο της Ανταρκτικής, ενώ ο Βόρειος Πόλος βρίσκεται πάνω σε θαλάσσιο πάγο.","sourceId":"general-28","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-parade-earth-crust","question":"Η Γη έχει πυρήνα, μανδύα και ποιο τρίτο βασικό στρώμα;","options":["Κρούστα","Ιονόσφαιρα","Τροπόσφαιρα","Μαγνητόσφαιρα"],"correct":0,"trivia":"Η κρούστα είναι το εξωτερικό στερεό στρώμα της Γης. Κάτω από αυτή βρίσκονται ο μανδύας και, βαθύτερα, ο πυρήνας.","sourceId":"planet-18","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"}],"400":[{"id":"src-797","question":"Σε τι μένουν τα Στρουμφάκια;","options":["Μανιτάρια","Σπηλιές","Δέντρα","Κολοκύθες"],"correct":0,"sourceId":"797","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μανιτάρια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1325","question":"Με ποια δύο δάχτυλα κρατιέται συνήθως η πένα της κιθάρας;","options":["Αντίχειρα και δείκτη","Δείκτη και μέσο","Αντίχειρα και παράμεσο","Παράμεσο και μικρό"],"correct":0,"sourceId":"1325","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αντίχειρα και δείκτη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-741","question":"Σε ποια σημερινή χώρα θα πήγαινες αν ταξίδευες στο παλιό Σιάμ;","options":["Βιετνάμ","Σρι Λάνκα","Ταϊλάνδη","Μαλαισία"],"correct":2,"sourceId":"741","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ταϊλάνδη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-807","question":"Ποια πρωτεύουσα πήρε το όνομά της από θεά;","options":["Ρώμη","Αθήνα","Βιέννη","Σόφια"],"correct":1,"sourceId":"807","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αθήνα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-886","question":"Σε ποιο παιχνίδι χρησιμοποιείται η φράση «βλέπω και ανεβάζω»;","options":["Πόκερ","Ρουλέτα","Μπριτζ","Μπεζίκ"],"correct":0,"sourceId":"886","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Πόκερ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-user-berlin-largest","question":"Ποια είναι η μεγαλύτερη πόλη της Γερμανίας σε πληθυσμό;","options":["Αμβούργο","Μόναχο","Βερολίνο","Κολωνία"],"correct":2,"trivia":"Το Βερολίνο είναι τόσο η πρωτεύουσα όσο και η πολυπληθέστερη πόλη της Γερμανίας.","sourceId":"capital-berlin-adapted","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-user-cannes-film","question":"Σε ποια γαλλική πόλη της Μεσογείου διοργανώνεται το διάσημο διεθνές φεστιβάλ κινηματογράφου;","options":["Νίκαια","Μασσαλία","Κάννες","Μονπελιέ"],"correct":2,"trivia":"Το Φεστιβάλ των Καννών διοργανώνεται στην Κυανή Ακτή και το κορυφαίο βραβείο του είναι ο Χρυσός Φοίνικας.","sourceId":"city-cannes","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-user-edinburgh","question":"Σε ποια πόλη θα έβρισκες το Arthur’s Seat και θα μπορούσες να δοκιμάσεις παραδοσιακό haggis;","options":["Γλασκώβη","Εδιμβούργο","Δουβλίνο","Κάρντιφ"],"correct":1,"trivia":"Το Arthur’s Seat είναι αρχαίο ηφαιστειακό ύψωμα στο Εδιμβούργο, ενώ το haggis είναι από τα πιο γνωστά πιάτα της Σκωτίας.","sourceId":"city-edinburgh","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-user-baht","question":"Ποιας χώρας είναι νόμισμα το baht;","options":["Βιετνάμ","Ταϊλάνδη","Καμπότζη","Μαλαισία"],"correct":1,"trivia":"Το baht είναι το επίσημο νόμισμα της Ταϊλάνδης και ο διεθνής κωδικός του είναι THB.","sourceId":"countries-25","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-parade-table-mountain","question":"Σε ποια πόλη της Νότιας Αφρικής βρίσκεται το Table Mountain;","options":["Γιοχάνεσμπουργκ","Ντέρμπαν","Κέιπ Τάουν","Πρετόρια"],"correct":2,"trivia":"Το Table Mountain δεσπόζει πάνω από το Κέιπ Τάουν και αποτελεί ένα από τα πιο αναγνωρίσιμα φυσικά τοπόσημα της Νότιας Αφρικής.","sourceId":"landmarks-39","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-parade-holland","question":"Ποια χώρα αποκαλείται συχνά, αν και όχι απολύτως σωστά, «Ολλανδία»;","options":["Βέλγιο","Κάτω Χώρες","Δανία","Λουξεμβούργο"],"correct":1,"trivia":"Η επίσημη χώρα είναι οι Κάτω Χώρες. Η «Ολλανδία» είναι ιστορικά μόνο μία περιοχή της χώρας, χωρισμένη σήμερα σε Βόρεια και Νότια Ολλανδία.","sourceId":"general-22","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"}],"500":[{"id":"src-485","question":"Τι σημαίνει η λέξη «Garp» στον τίτλο «Ουδέν νεώτερον από το Δυτικό Μέτωπο»;","options":["Βορράς","Νότος","Ανατολή","Δύση"],"correct":3,"sourceId":"485","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Δύση». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-1666","question":"Ποιες κάρτες δημιουργήθηκαν αρχικά στην Ιταλία για παιχνίδι και αργότερα συνδέθηκαν με μαντεία;","options":["Καμπάλα","Ωροσκόπιο","Πασιέντζα","Ταρώ"],"correct":3,"sourceId":"1666","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ταρώ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1622","question":"Ποια χώρα έχει το ίδιο όνομα με την πρωτεύουσά της;","options":["Αργεντινή","Λουξεμβούργο","Νορβηγία","Λίβανος"],"correct":1,"sourceId":"1622","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λουξεμβούργο». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-533","question":"Αν βλέπεις το όρος Ερτζιγές και τρως μαντί, σε ποια πόλη της Τουρκίας βρίσκεσαι;","options":["Μαρντίν","Μανίσα","Καισάρεια","Χατάι"],"correct":2,"sourceId":"533","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Καισάρεια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-521","question":"Πώς ονομάζεται ο γιατρός που έχει τελειώσει Ιατρική αλλά δεν έχει αποκτήσει ειδικότητα;","options":["Λέκτορας","Ψυχολόγος","Γενικός ιατρός","Σύμβουλος"],"correct":2,"sourceId":"521","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Γενικός ιατρός». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-571","question":"Πώς λέγεται το εργαλείο που δείχνει αν μια επιφάνεια είναι οριζόντια;","options":["Υδραργυρικό μέτρο","Αμμόμετρο","Λαδόμετρο","Αλφάδι"],"correct":3,"sourceId":"571","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αλφάδι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-820","question":"Σε ποιο μεταφορικό μέσο συναντάμε στο έδαφος ειδικούς υπαλλήλους που καθοδηγούν με φωτεινές ράβδους;","options":["Λεωφορείο","Αεροπλάνο","Τρένο","Πλοίο"],"correct":1,"sourceId":"820","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αεροπλάνο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-945","question":"Ποιες τρεις εξουσίες αφορά η αρχή της διάκρισης των εξουσιών;","options":["Στρατό ξηράς, ναυτικό και αεροπορία","Νομοθετική, εκτελεστική και δικαστική","Ανώτατα δικαστήρια","Στρατό, αστυνομία και μυστικές υπηρεσίες"],"correct":1,"sourceId":"945","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Νομοθετική, εκτελεστική και δικαστική». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1116","question":"Ποιο διάσημο βιντεοπαιχνίδι δημιούργησε ο Ρώσος μηχανικός Αλεξέι Παζίτνοφ;","options":["Arkanoid","Tetris","Minesweeper","Pinball"],"correct":1,"sourceId":"1116","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Tetris». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1731","question":"Ποιος χρωματικός συνδυασμός χρησιμοποιείται συνήθως στο προειδοποιητικό σύμβολο ραδιενέργειας;","options":["Κίτρινο-πράσινο","Κίτρινο-μαύρο","Μαύρο-λευκό","Κόκκινο-λευκό"],"correct":1,"sourceId":"1731","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κίτρινο-μαύρο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2086","question":"Στις κλασικές βινυλιακές εκδόσεις, πόσες στροφές ανά λεπτό έχει συνήθως ένα LP;","options":["33","45","66","90"],"correct":0,"sourceId":"2086","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «33». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2239","question":"Στις ιστορίες του Lucky Luke, σε τι βουτούν συχνά έναν τιμωρημένο απατεώνα πριν τον καλύψουν με πούπουλα;","options":["Ζύμη","Λάσπη","Ασβέστη","Πίσσα"],"correct":3,"sourceId":"2239","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Πίσσα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1281","question":"Πώς ονομαζόταν συλλογικά το πολιτικό και ιδεολογικό σύνορο που χώριζε την Ανατολική από τη Δυτική Ευρώπη στον Ψυχρό Πόλεμο;","options":["Τρίτος Κόσμος","Σιδηρούν Παραπέτασμα","Μεγάλο Μήλο","Χώρες του Τείχους"],"correct":1,"sourceId":"1281","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σιδηρούν Παραπέτασμα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1620","question":"Γιατί ο Οβελίξ δεν χρειάζεται να πιει το μαγικό φίλτρο στις ιστορίες του Αστερίξ;","options":["Έπεσε στη χύτρα όταν ήταν μικρός","Δεν τον επηρεάζει η μαγεία","Τον ζαλίζει","Τον κάνει να νυστάζει"],"correct":0,"sourceId":"1620","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Έπεσε στη χύτρα όταν ήταν μικρός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1775","question":"Στο ποδόσφαιρο, σε ποια περίπτωση χρησιμοποιείται η απόσταση των 9,15 μέτρων;","options":["Στην κολύμβηση","Στην εκτέλεση φάουλ","Στο γκολφ","Στο τένις"],"correct":1,"sourceId":"1775","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Στην εκτέλεση φάουλ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2250","question":"Από ποιο ακριβό ανθοφόρο φυτό προέρχεται η φυσική βανίλια;","options":["Ορχιδέα","Μανόλια","Χρυσάνθεμο","Πασχαλιά"],"correct":0,"sourceId":"2250","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ορχιδέα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-899","question":"Ποιος έγραψε τον «Δον Κιχώτη»;","options":["Μιγκέλ ντε Θερβάντες","Δάντης","Αλεξάντρ Πούσκιν","Ονορέ ντε Μπαλζάκ"],"correct":0,"sourceId":"899","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Μιγκέλ ντε Θερβάντες. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-972","question":"Ποιο ζώο βρίσκεται μαζί με τον Πι στη σωσίβια λέμβο στην ταινία «Η Ζωή του Πι»;","options":["Ζέβρα","Τίγρη","Ουρακοτάγκος","Ύαινα"],"correct":1,"sourceId":"972","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το ζώο είναι «Τίγρη». Το γνώρισμα που περιγράφεται στην ερώτηση είναι χαρακτηριστικό που βοηθά στην αναγνώρισή του."},{"id":"src-1136","question":"Τι χρώμα είναι ο καπνός από την Καπέλα Σιξτίνα όταν έχει εκλεγεί νέος Πάπας;","options":["Λευκός","Μαύρος","Πράσινος","Κόκκινος"],"correct":0,"sourceId":"1136","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λευκός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1273","question":"Σε ποια χώρα βρίσκονται η Αλάμπρα και η παράδοση των tapas;","options":["Τυνησία","Ολλανδία","Ισπανία","Ιταλία"],"correct":2,"sourceId":"1273","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ισπανία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1706","question":"Αν σε ένα οφθαλμολογικό τεστ σου ζητούν να διακρίνεις αριθμούς μέσα σε κύκλους από χρωματιστές τελείες, τι ελέγχεται κυρίως;","options":["Υπερμετρωπία","Καταρράκτης","Αχρωματοψία","Μυωπία"],"correct":2,"sourceId":"1706","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αχρωματοψία». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1840","question":"Ποια χώρα αποκαλείται συχνά «γενέτειρα του σύγχρονου ποδοσφαίρου»;","options":["Ισπανία","Γερμανία","Βραζιλία","Αγγλία"],"correct":3,"sourceId":"1840","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αγγλία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-2150","question":"Πώς ονομάζεται συνήθως η κεντρική τράπεζα των ΗΠΑ;","options":["IMF","Federal Reserve","NASDAQ","UN"],"correct":1,"sourceId":"2150","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Federal Reserve». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-881","question":"Ποιος έγραψε τους «Άθλιους» και την «Παναγία των Παρισίων»;","options":["Victor Hugo","Leo Tolstoy","Charles Dickens","Jean-Jacques Rousseau"],"correct":0,"sourceId":"881","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Victor Hugo. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-980","question":"Πώς ονομάζεται ο τένοντας που συνδέει τους μύες της γάμπας με την πτέρνα;","options":["Αχίλλειος","Άτλας","Αστράγαλος","Πύελος"],"correct":0,"sourceId":"980","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Αχίλλειος». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1311","question":"Πώς ονομάζεται ο φανταστικός τόπος όπου ζει ο Peter Pan;","options":["Χώρα του Ποτέ","Χαμένο Νησί","Ατλαντίδα","Λιλιπούπολη"],"correct":0,"sourceId":"1311","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Χώρα του Ποτέ». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1506","question":"Ποιο γνωστό παιδικό έργο έγραψε ο J. M. Barrie;","options":["Οι Μουσικοί της Βρέμης","Peter Pan","Πινόκιο","Mary Poppins"],"correct":1,"sourceId":"1506","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Peter Pan». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1863","question":"Σε μυθιστόρημα ποιου συγγραφέα βασίστηκε η ταινία «Ο Νονός»;","options":["Umberto Eco","Milan Kundera","Charlie Chaplin","Mario Puzo"],"correct":3,"sourceId":"1863","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Mario Puzo». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1937","question":"Ποιος σκηνοθέτησε τα «Big Fish», «Edward Scissorhands» και «Charlie and the Chocolate Factory»;","options":["Woody Allen","David Fincher","James Cameron","Tim Burton"],"correct":3,"sourceId":"1937","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Tim Burton. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-2018","question":"Σε ποιον καλλιτέχνη ανήκουν η «Δημιουργία του Αδάμ» και το άγαλμα του Δαβίδ;","options":["Rodin","El Greco","Michelangelo","Leonardo da Vinci"],"correct":2,"sourceId":"2018","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Michelangelo». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2093","question":"Ποιος σκηνοθέτησε το «Inception», το «Batman Begins» και το «The Dark Knight»;","options":["Steven Spielberg","Martin Scorsese","George Lucas","Christopher Nolan"],"correct":3,"sourceId":"2093","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Christopher Nolan. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-706","question":"Ποιος θεωρείται θεμελιωτής της ψυχανάλυσης και έγραψε την «Ερμηνεία των Ονείρων»;","options":["Ivan Pavlov","Carl Gustav Jung","Sigmund Freud","Marquis de Sade"],"correct":2,"sourceId":"706","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Sigmund Freud». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-714","question":"Τι σημαίνουν τα αρχικά WC;","options":["Water Closet","Wall Chair","World Center","White Corner"],"correct":0,"sourceId":"714","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Water Closet». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-721","question":"Ποιος σκηνοθέτησε τη «Λίστα του Σίντλερ» και τη «Διάσωση του Στρατιώτη Ράιαν»;","options":["Quentin Tarantino","Steven Spielberg","Stanley Kubrick","George Lucas"],"correct":1,"sourceId":"721","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Steven Spielberg. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-861","question":"Σε ποιο παιχνίδι αφαιρούμε λεπτά ξυλάκια ένα-ένα χωρίς να μετακινήσουμε τα υπόλοιπα;","options":["Ντάμα","Mikado","Jenga","Βελάκια"],"correct":1,"sourceId":"861","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Mikado». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-907","question":"Πόσα πόδια έχει συνήθως ένα πιάνο με ουρά;","options":["3","4","5","6"],"correct":0,"sourceId":"907","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «3». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-910","question":"Ποια συγγραφέας έγραψε το «Όσα Παίρνει ο Άνεμος»;","options":["Margaret Mitchell","Barbara Cartland","Jane Austen","Emily Brontë"],"correct":0,"sourceId":"910","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Margaret Mitchell». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-923","question":"Ποιο ιστορικό μουσικό φεστιβάλ συγκέντρωσε εκατοντάδες χιλιάδες ανθρώπους στη Νέα Υόρκη το 1969;","options":["Woodstock","Oktoberfest","Glastonbury","Live 8"],"correct":0,"sourceId":"923","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Woodstock». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1027","question":"Τι σημαίνει κοπή «julienne» στη μαγειρική;","options":["Σε κύβους","Σε μακριές λεπτές λωρίδες","Σε ροδέλες","Σε μισοφέγγαρα"],"correct":1,"sourceId":"1027","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Σε μακριές λεπτές λωρίδες». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-1826","question":"Πώς ονομάζεται η σχετικά ήρεμη περιοχή στο κέντρο ενός ισχυρού τροπικού κυκλώνα;","options":["Καρδιά της καταιγίδας","Εγκέφαλος της καταιγίδας","Πρόσωπο της καταιγίδας","Μάτι της καταιγίδας"],"correct":3,"sourceId":"1826","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Μάτι της καταιγίδας». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1437","question":"Τι αποστρέφεται ένας μισάνθρωπος;","options":["Την τεχνολογία","Τους καθρέφτες","Τους ανθρώπους","Τους κλόουν"],"correct":2,"sourceId":"1437","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Τους ανθρώπους». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-user-urals","question":"Ποια οροσειρά χρησιμοποιείται παραδοσιακά ως μέρος του γεωγραφικού ορίου Ευρώπης και Ασίας;","options":["Άλπεις","Καύκασος","Ουράλια","Καρπάθια"],"correct":2,"trivia":"Τα Ουράλια εκτείνονται περίπου από τον Αρκτικό Ωκεανό προς το Καζακστάν και αποτελούν ένα από τα συμβατικά όρια ανάμεσα στην Ευρώπη και την Ασία.","sourceId":"17-adapted","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-rd-caspian","question":"Ποια είναι η μεγαλύτερη λίμνη του κόσμου σε επιφάνεια;","options":["Βαϊκάλη","Σουπίριορ","Κασπία Θάλασσα","Βικτώρια"],"correct":2,"trivia":"Παρά την ονομασία της, η Κασπία Θάλασσα είναι κλειστή υδάτινη λεκάνη και κατατάσσεται ως η μεγαλύτερη λίμνη του κόσμου σε επιφάνεια.","sourceId":"111","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-greenland","question":"Ποιο είναι το μεγαλύτερο νησί του κόσμου, αν δεν θεωρήσουμε την Αυστραλία νησί;","options":["Μαδαγασκάρη","Γροιλανδία","Βόρνεο","Νέα Γουινέα"],"correct":1,"trivia":"Η Γροιλανδία είναι το μεγαλύτερο νησί του κόσμου. Η Αυστραλία κατατάσσεται συνήθως ως ήπειρος και όχι ως νησί.","sourceId":"general-13","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-buzz-volga","question":"Ποιος είναι ο μακρύτερος ποταμός της Ευρώπης;","options":["Δούναβης","Ρήνος","Βόλγας","Δνείπερος"],"correct":2,"trivia":"Ο Βόλγας είναι ο μακρύτερος ποταμός της Ευρώπης και εκβάλλει στην Κασπία Θάλασσα.","sourceId":"79","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-user-cuba-largest-caribbean","question":"Ποιο είναι το μεγαλύτερο νησί της Καραϊβικής;","options":["Τζαμάικα","Κούβα","Πουέρτο Ρίκο","Μπαρμπάντος"],"correct":1,"trivia":"Η Κούβα είναι το μεγαλύτερο νησί της Καραϊβικής και αποτελεί το μεγαλύτερο τμήμα του ομώνυμου κράτους.","sourceId":"multiple-choice-caribbean","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-rd-cape-good-hope","question":"Σε ποια χώρα βρίσκεται το Ακρωτήριο της Καλής Ελπίδας;","options":["Ναμίμπια","Μοζαμβίκη","Νότια Αφρική","Μαδαγασκάρη"],"correct":2,"trivia":"Το Ακρωτήριο της Καλής Ελπίδας βρίσκεται στη χερσόνησο του Ακρωτηρίου στη Νότια Αφρική, κοντά στο Κέιπ Τάουν.","sourceId":"46","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-petra","question":"Σε ποια χώρα βρίσκεται η αρχαία πόλη Πέτρα;","options":["Ιορδανία","Αίγυπτος","Ισραήλ","Λίβανος"],"correct":0,"trivia":"Η Πέτρα βρίσκεται στην Ιορδανία και είναι διάσημη για τα μνημεία που είναι λαξευμένα στους ροζ ψαμμιτικούς βράχους.","sourceId":"countries-14","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-grand-canyon-river","question":"Ποιος ποταμός διασχίζει το Grand Canyon;","options":["Ρίο Γκράντε","Κολοράντο","Μισούρι","Κολούμπια"],"correct":1,"trivia":"Ο ποταμός Κολοράντο διασχίζει το Grand Canyon και έχει συμβάλει στη διαμόρφωσή του επί εκατομμύρια χρόνια.","sourceId":"general-2","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"}],"1000":[{"id":"src-1147","question":"Τι σημαίνουν τα αρχικά WWW στις διευθύνσεις του διαδικτύου;","options":["World Wide Web","World White Web","World Well Web","World West Web"],"correct":0,"sourceId":"1147","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «World Wide Web». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1936","question":"Σε ποια σειρά ιστοριών είναι διάσημος μάγος ο Ντάμπλντορ;","options":["Harry Potter","Ο Μάγος του Οζ","Ο Άρχοντας των Δαχτυλιδιών","Η Αλίκη στη Χώρα των Θαυμάτων"],"correct":0,"sourceId":"1936","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Harry Potter». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-688","question":"Αν τρως İskender και γλυκό κάστανο, σε ποια τουρκική πόλη βρίσκεσαι;","options":["Ντενιζλί","Τοκάτ","Αδριανούπολη","Προύσα"],"correct":3,"sourceId":"688","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Προύσα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1173","question":"Αν κρατάς την εφημερίδα The Guardian, ποιας χώρας την επικαιρότητα διαβάζεις;","options":["Γαλλία","ΗΠΑ","Ηνωμένο Βασίλειο","Ισπανία"],"correct":2,"sourceId":"1173","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ηνωμένο Βασίλειο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1408","question":"Ποια σημερινή συσκευή έκανε περίπου τη δουλειά του παλιού πολύγραφου;","options":["Εκτυπωτής","Φαξ","Αριθμομηχανή","Φωτοτυπικό"],"correct":3,"sourceId":"1408","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Φωτοτυπικό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1432","question":"Πάνω σε ποια επιφάνεια δημιουργείται παραδοσιακά η τεχνική ζωγραφικής ebru;","options":["Τοίχο","Νερό","Ξύλο","Καμβά"],"correct":1,"sourceId":"1432","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Νερό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2026","question":"Πώς ονομάζεται το λεπτό, πυκνό ύφασμα που καλύπτει συνήθως ένα τραπέζι μπιλιάρδου;","options":["Πικέ","Ταφτάς","Ίνα","Τσόχα μπιλιάρδου"],"correct":3,"sourceId":"2026","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Τσόχα μπιλιάρδου». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1117","question":"Πώς ονομάζεται η μικρή περιοχή ακριβώς μπροστά από το τέρμα στο ποδόσφαιρο;","options":["Μικρή περιοχή","Κεντρικός κύκλος","Γωνιαία περιοχή","Σημείο πέναλτι"],"correct":0,"sourceId":"1117","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Μικρή περιοχή». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-616","question":"Ποιο αρχαίο επιτραπέζιο παιχνίδι στρατηγικής παίζεται σε τετραγωνισμένο ταμπλό με μαύρες και λευκές πέτρες;","options":["Ντόμινο","Jenga","Scrabble","Go"],"correct":3,"sourceId":"616","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Go». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-846","question":"Ποιος γαλλικός όρος σημαίνει κυριολεκτικά «νερό τουαλέτας» και δηλώνει ελαφρύτερη συγκέντρωση αρώματος;","options":["Eau de toilette","Eau de cologne","Eau de parfum","After shave"],"correct":0,"sourceId":"846","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Eau de toilette». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-994","question":"Στο «Star Trek», ποιον χαρακτήρα καλεί ο Kirk στη γνωστή φράση «Beam me up...»;","options":["Captain Kirk","Mr. Spock","Scotty","Dr. McCoy"],"correct":2,"sourceId":"994","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Scotty». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1098","question":"Πώς ονομάζεται το μαλακό, χωρίς τακούνι παπούτσι που έχει συνδεθεί ιστορικά με αυτόχθονες λαούς της Βόρειας Αμερικής;","options":["Εσπαντρίγια","Μοκασίνι","Μπαλαρίνα","Σαμπό"],"correct":1,"sourceId":"1098","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Μοκασίνι». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1242","question":"Πόσες επίπεδες πλευρές έχει συνήθως ένα κλασικό ξύλινο μολύβι για να πιάνεται εύκολα και να μην κυλά;","options":["3","4","5","6"],"correct":3,"sourceId":"1242","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «6». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-1310","question":"Ποιο ζώο έδωσε το όνομά του στον βαρύ κορμό που χρησιμοποιούνταν παλιά για να σπάνε πύλες οχυρών;","options":["Λύκος","Τίγρη","Κριός","Ταύρος"],"correct":2,"sourceId":"1310","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το ζώο είναι «Κριός». Το γνώρισμα που περιγράφεται στην ερώτηση είναι χαρακτηριστικό που βοηθά στην αναγνώρισή του."},{"id":"src-1465","question":"Η ονομασία «Άπω Ανατολή» προέκυψε ιστορικά επειδή η περιοχή θεωρούνταν μακρινή σε σχέση με ποια ήπειρο;","options":["Αμερική","Πόλους","Ευρώπη","Αφρική"],"correct":2,"sourceId":"1465","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ευρώπη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1472","question":"Ποιο από τα παρακάτω δέντρα δεν είναι κωνοφόρο και δεν παράγει κώνους;","options":["Ερυθρελάτη","Κυπαρίσσι","Κέδρος","Φλαμουριά"],"correct":3,"sourceId":"1472","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Φλαμουριά». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-900","question":"Ποιος σκηνοθέτησε τις ταινίες «Braveheart», «The Passion of the Christ» και «Apocalypto»;","options":["Woody Allen","Mel Gibson","Sean Penn","Clint Eastwood"],"correct":1,"sourceId":"900","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Mel Gibson. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-948","question":"Ποιος σκηνοθέτησε το «Taxi Driver», τα «Goodfellas» και τις «Συμμορίες της Νέας Υόρκης»;","options":["Francis Ford Coppola","Martin Scorsese","John Ford","Akira Kurosawa"],"correct":1,"sourceId":"948","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Martin Scorsese. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1148","question":"Ποιο είναι το μοναδικό μυθιστόρημα που εξέδωσε η Emily Brontë;","options":["Το Κρίνο στην Κοιλάδα","Ένα Δικό της Δωμάτιο","Ανεμοδαρμένα Ύψη","Περηφάνια και Προκατάληψη"],"correct":2,"sourceId":"1148","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ανεμοδαρμένα Ύψη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1419","question":"Ποια συγγραφέας έγραψε το «Έγκλημα στο Όριεντ Εξπρές»;","options":["Agatha Christie","Arthur Conan Doyle","Ian Fleming","Jean-Christophe Grangé"],"correct":0,"sourceId":"1419","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Agatha Christie». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1615","question":"Ποιο μυθιστόρημα του Boris Pasternak διαδραματίζεται με φόντο τη Ρωσική Επανάσταση;","options":["Ανεμοδαρμένα Ύψη","Μεγάλες Προσδοκίες","Πόλεμος και Ειρήνη","Doctor Zhivago"],"correct":3,"sourceId":"1615","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Doctor Zhivago». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1647","question":"Ποιος συγγραφέας ζήτησε να καούν πολλά χειρόγραφά του μετά τον θάνατό του, αλλά ο φίλος του Max Brod δεν υπάκουσε;","options":["Franz Kafka","Jorge Luis Borges","Gabriel García Márquez","Albert Camus"],"correct":0,"sourceId":"1647","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Franz Kafka». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1668","question":"Ποιος σκηνοθέτησε τα «Million Dollar Baby» και «Mystic River»;","options":["Mel Gibson","Clint Eastwood","Pedro Almodóvar","Guy Ritchie"],"correct":1,"sourceId":"1668","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Clint Eastwood. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1825","question":"Ποιος συγγραφέας έγραψε την ιστορία στην οποία βασίστηκε η ταινία «The Shawshank Redemption»;","options":["Stephen King","Ian Fleming","Paul Auster","Samuel Beckett"],"correct":0,"sourceId":"1825","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Stephen King». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1841","question":"Ποιος σκηνοθέτησε το «Fight Club» και το «Se7en»;","options":["David Fincher","Ridley Scott","John Carpenter","George Lucas"],"correct":0,"sourceId":"1841","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο David Fincher. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-2233","question":"Ποια συγγραφέας έγραψε τις «Μικρές Κυρίες»;","options":["Emily Brontë","Jane Austen","Marguerite Duras","Louisa May Alcott"],"correct":3,"sourceId":"2233","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Louisa May Alcott». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2263","question":"Ποιος σκηνοθέτησε τα spaghetti western «Ο Καλός, ο Κακός και ο Άσχημος» και «Κάποτε στη Δύση»;","options":["John Ford","Sergio Leone","Quentin Tarantino","Clint Eastwood"],"correct":1,"sourceId":"2263","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Sergio Leone. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-691","question":"Ποιο μυθιστόρημα του William Golding περιγράφει μια ομάδα παιδιών που απομονώνονται σε νησί και σταδιακά εκβαρβαρίζονται;","options":["Δύο Χρόνια Διακοπές","Άνθρωποι και Ποντίκια","Ο Πλανήτης των Πιθήκων","Ο Άρχοντας των Μυγών"],"correct":3,"sourceId":"691","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ο Άρχοντας των Μυγών». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-938","question":"Ποιος έγραψε τον «Παίκτη» και τις «Σημειώσεις από το Υπόγειο»;","options":["Fyodor Dostoevsky","Leo Tolstoy","Alexander Pushkin","Vladimir Nabokov"],"correct":0,"sourceId":"938","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Fyodor Dostoevsky. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-957","question":"Ποια δομή περιέγραψαν το 1953 οι James Watson και Francis Crick;","options":["Μαύρες τρύπες","DNA","Μεγάλη Έκρηξη","Αιγυπτιακά ιερογλυφικά"],"correct":1,"sourceId":"957","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «DNA». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1052","question":"Ποιος σκηνοθέτησε τις ταινίες «Life of Pi», «Crouching Tiger, Hidden Dragon» και «Brokeback Mountain»;","options":["Quentin Tarantino","Steven Spielberg","Ang Lee","Michael Haneke"],"correct":2,"sourceId":"1052","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Ang Lee. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1420","question":"Ποιος είπε το 1863 τη γνωστή φράση για «κυβέρνηση του λαού, από τον λαό, για τον λαό»;","options":["Napoleon Bonaparte","Abraham Lincoln","Winston Churchill","Friedrich Engels"],"correct":1,"sourceId":"1420","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Abraham Lincoln». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1601","question":"Ένα δοχείο νερού περίπου 19 λίτρων αντιστοιχεί περίπου σε πόσα αμερικανικά γαλόνια;","options":["1","3","5","7"],"correct":2,"sourceId":"1601","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «5». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-594","question":"Σε ποιον αποδίδεται η φράση «τα του Καίσαρος τω Καίσαρι»;","options":["Ιησούς","Μέγας Αλέξανδρος","Ιούλιος Καίσαρας","Ομάρ"],"correct":0,"sourceId":"594","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ιησούς». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1811","question":"Ποια φιλοσοφική αλληγορία περιγράφει ανθρώπους που θεωρούν τις σκιές σε έναν τοίχο ως ολόκληρη την πραγματικότητα;","options":["Το σπήλαιο του Πλάτωνα","Το σπήλαιο του Hegel","Το σπήλαιο του Kant","Το σπήλαιο του Confucius"],"correct":0,"sourceId":"1811","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Το σπήλαιο του Πλάτωνα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-user-swiss-cantons","question":"Πόσα καντόνια έχει η Ελβετία;","options":["20","24","26","28"],"correct":2,"trivia":"Η Ελβετική Συνομοσπονδία αποτελείται από 26 καντόνια, καθένα με σημαντικό βαθμό αυτονομίας.","sourceId":"swiss-cantons","sourceLevel":null,"source":"Parade — Geography Trivia Questions (user-provided extract)","sourceUrl":"https://parade.com/1246355/marynliles/geography-trivia/"},{"id":"geo-rd-canada-coastline","question":"Ποια χώρα έχει τη μεγαλύτερη ακτογραμμή στον κόσμο;","options":["Ρωσία","Αυστραλία","Καναδάς","Ινδονησία"],"correct":2,"trivia":"Ο Καναδάς έχει τη μεγαλύτερη συνολική ακτογραμμή στον κόσμο, επειδή βρέχεται από τρεις ωκεανούς και διαθέτει τεράστιο αριθμό νησιών.","sourceId":"101","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"Government of Canada"},{"id":"geo-rd-k2","question":"Ποιο είναι το δεύτερο ψηλότερο βουνό του κόσμου μετά το Έβερεστ;","options":["K2","Κανγκτσεντζούνγκα","Λότσε","Μακάλου"],"correct":0,"trivia":"Το K2 φτάνει τα 8.611 μέτρα και βρίσκεται στην οροσειρά Καρακορούμ. Θεωρείται τεχνικά από τις δυσκολότερες κορυφές για ανάβαση.","sourceId":"54","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-rd-russia-timezones","question":"Πόσες ζώνες ώρας καλύπτει η Ρωσία;","options":["7","9","11","13"],"correct":2,"trivia":"Η Ρωσία εκτείνεται σε 11 ζώνες ώρας, αποτέλεσμα του τεράστιου μήκους της από την ανατολική Ευρώπη έως τον Ειρηνικό.","sourceId":"49","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-kazakhstan","question":"Ποια είναι η μεγαλύτερη περίκλειστη χώρα του κόσμου, χωρίς πρόσβαση σε ανοιχτή θάλασσα;","options":["Μογγολία","Καζακστάν","Τσαντ","Βολιβία"],"correct":1,"trivia":"Το Καζακστάν είναι η μεγαλύτερη περίκλειστη χώρα σε έκταση. Βρέχεται από την κλειστή Κασπία Θάλασσα, αλλά δεν έχει πρόσβαση σε ωκεανό.","sourceId":"countries-18","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-abyssinia","question":"Ποια σημερινή αφρικανική χώρα ήταν παλαιότερα γνωστή ως Αβησσυνία;","options":["Αιθιοπία","Ερυθραία","Σομαλία","Σουδάν"],"correct":0,"trivia":"Η Αβησσυνία είναι ιστορική ονομασία που συνδέεται κυρίως με την Αιθιοπία, ένα από τα αρχαιότερα κράτη της Αφρικής.","sourceId":"countries-5","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-chichen-itza","question":"Σε ποια χώρα βρίσκονται τα ερείπια των Μάγια στο Chichén Itzá;","options":["Γουατεμάλα","Μεξικό","Περού","Μπελίζ"],"correct":1,"trivia":"Το Chichén Itzá βρίσκεται στη χερσόνησο Γιουκατάν του Μεξικού και ήταν σημαντικό κέντρο του πολιτισμού των Μάγια.","sourceId":"58","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-rd-angkor","question":"Σε ποια χώρα βρίσκεται το Angkor Wat;","options":["Ταϊλάνδη","Καμπότζη","Λάος","Μιανμάρ"],"correct":1,"trivia":"Το Angkor Wat βρίσκεται στην Καμπότζη και αποτελεί μέρος του τεράστιου αρχαιολογικού συγκροτήματος της Άνγκορ.","sourceId":"60-adapted","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-matterhorn","question":"Ανάμεσα σε ποιες δύο χώρες βρίσκεται το Matterhorn;","options":["Γαλλία και Ιταλία","Ελβετία και Ιταλία","Αυστρία και Ελβετία","Γαλλία και Ελβετία"],"correct":1,"trivia":"Το Matterhorn βρίσκεται στα σύνορα Ελβετίας και Ιταλίας και είναι μία από τις πιο αναγνωρίσιμες κορυφές των Άλπεων.","sourceId":"countries-19","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-buzz-belize-english","question":"Ποια από τις παρακάτω χώρες της Κεντρικής Αμερικής έχει τα αγγλικά ως επίσημη γλώσσα;","options":["Κόστα Ρίκα","Μπελίζ","Παναμάς","Νικαράγουα"],"correct":1,"trivia":"Το Μπελίζ ήταν βρετανική αποικία με την ονομασία British Honduras, γι’ αυτό και τα αγγλικά παραμένουν επίσημη γλώσσα.","sourceId":"36","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"}],"2000":[{"id":"src-1112","question":"Ποιος έγραψε το «Περιμένοντας τον Γκοντό»;","options":["Τόμας Μαν","Σάμιουελ Μπέκετ","Γουίλιαμ Φόκνερ","Τζορτζ Μπέρναρντ Σο"],"correct":1,"sourceId":"1112","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Σάμιουελ Μπέκετ. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-847","question":"Σε ποιο βιβλίο εμφανίζεται το γνωστό σχέδιο με έναν βόα που έχει καταπιεί έναν ελέφαντα;","options":["Το Πορτοκάλι μου","Τα Παιδιά της Οδού Παλ","Ο Μικρός Πρίγκιπας","Το Κοριτσάκι με τα Σπίρτα"],"correct":2,"sourceId":"847","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η αναφορά προέρχεται από το «Ο Μικρός Πρίγκιπας». Το συγκεκριμένο στοιχείο είναι χαρακτηριστικό του έργου και λειτουργεί ως βασικό clue."},{"id":"src-1328","question":"Σε ποια ευρωπαϊκή πόλη βρίσκεται το Μουσείο της Περγάμου;","options":["Βερολίνο","Λονδίνο","Αθήνα","Ρώμη"],"correct":0,"sourceId":"1328","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βερολίνο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1864","question":"Σε ποια από τις παρακάτω περιοχές μπορείς να συναντήσεις οδική προειδοποίηση για πιγκουίνους;","options":["Γροιλανδία","Σιβηρία","Νότια Αφρική","Ιαπωνία"],"correct":2,"sourceId":"1864","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Νότια Αφρική». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2159","question":"Ποιο βραβευμένο μιούζικαλ αποτελεί σύγχρονη διασκευή της ιστορίας του Ρωμαίου και της Ιουλιέτας;","options":["Cats","Hair","West Side Story","The Phantom of the Opera"],"correct":2,"sourceId":"2159","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «West Side Story». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-805","question":"Ποιο από τα παρακάτω ζώα έχει χαρακτηριστικά οριζόντια, ορθογώνια κόρη ματιού;","options":["Κότα","Αγελάδα","Καμήλα","Κατσίκα"],"correct":3,"sourceId":"805","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κατσίκα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-888","question":"Με ποια έκφραση περιγράφεται υποτιμητικά μια πολιτικά ασταθής χώρα με αδύναμη οικονομία και εξάρτηση από λίγες εξαγωγές;","options":["Δημοκρατία του καρπουζιού","Μπανανία","Δημοκρατία του ανανά","Δημοκρατία του λεμονιού"],"correct":1,"sourceId":"888","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μπανανία». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1824","question":"Ποια μεσογειακή συνήθεια πήρε το όνομά της από τη λατινική έκφραση για την «έκτη ώρα» της ημέρας;","options":["Siesta","Fado","Fiesta","Carpe Diem"],"correct":0,"sourceId":"1824","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Siesta». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-592","question":"Ποιος έγραψε το «Άνθρωποι και Ποντίκια»;","options":["John Steinbeck","Mark Twain","William Faulkner","Ernest Hemingway"],"correct":0,"sourceId":"592","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την John Steinbeck. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-732","question":"Σε ποια πλατεία του Πεκίνου σημειώθηκαν οι μεγάλες διαδηλώσεις του 1989, με γνωστή την εικόνα ενός άνδρα μπροστά σε άρματα μάχης;","options":["Tahrir","Boxer","Tiananmen","Bloody Sunday"],"correct":2,"sourceId":"732","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Tiananmen». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-740","question":"Ποιο έργο του Douglas Adams ξεκίνησε ως ραδιοφωνική σειρά του BBC και αργότερα έγινε βιβλίο, τηλεόραση και κινηματογράφος;","options":["Θαυμαστός Καινούργιος Κόσμος","Foundation","Rama","Γυρίστε τον Γαλαξία με Ωτοστόπ"],"correct":3,"sourceId":"740","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γυρίστε τον Γαλαξία με Ωτοστόπ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-833","question":"Ποιος συγγραφέας έγραψε το «Κοράκι» και τους «Φόνους της οδού Μοργκ»;","options":["Edgar Allan Poe","Charles Dickens","Mark Twain","Ernest Hemingway"],"correct":0,"sourceId":"833","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Edgar Allan Poe». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-973","question":"Ποιος νομπελίστας συγγραφέας έγραψε το «Σιντάρτα»;","options":["Patrick Süskind","Paulo Coelho","Hermann Hesse","Tom Robbins"],"correct":2,"sourceId":"973","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Hermann Hesse». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1361","question":"Ποιος φιλόσοφος του Διαφωτισμού έγραψε το «Καντίντ ή Η Αισιοδοξία»;","options":["Descartes","Montaigne","Voltaire","Balzac"],"correct":2,"sourceId":"1361","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Voltaire». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1450","question":"Σε ποιο μυθιστόρημα μια έφηβη λαμβάνει μυστηριώδη μηνύματα και γνωρίζει σταδιακά την ιστορία της φιλοσοφίας;","options":["Ο Κόσμος της Σοφίας","Ο Άνθρωπος Ζάρι","Ο Αλχημιστής","Μια Σειρά από Ατυχή Γεγονότα"],"correct":0,"sourceId":"1450","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ο Κόσμος της Σοφίας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1458","question":"Ποιος έγραψε τον «Μπαρμπα-Γκοριό» και το «Κρίνο στην Κοιλάδα»;","options":["Honoré de Balzac","Simone de Beauvoir","Marcel Proust","Anton Chekhov"],"correct":0,"sourceId":"1458","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Honoré de Balzac. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-1473","question":"Ποιος σκηνοθέτησε την «Έκτη Αίσθηση», τα «Σημάδια» και «Το Χωριό»;","options":["David Lynch","Christopher Nolan","M. Night Shyamalan","Ang Lee"],"correct":2,"sourceId":"1473","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο M. Night Shyamalan. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1547","question":"Ποιος λογοτεχνικός ήρωας του Edmond Rostand είναι ξακουστός ξιφομάχος με πολύ μεγάλη μύτη;","options":["Don Juan","Cyrano de Bergerac","Faust","Doctor Zhivago"],"correct":1,"sourceId":"1547","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Cyrano de Bergerac». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1738","question":"Σε ποιον συγγραφέα και φιλόσοφο ανήκει η φράση «Η κόλαση είναι οι άλλοι»;","options":["Immanuel Kant","Samuel Beckett","Jean-Paul Sartre","Jean-Jacques Rousseau"],"correct":2,"sourceId":"1738","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Jean-Paul Sartre». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1783","question":"Σε ποιο από τα παρακάτω έργα ο βασικός ήρωας έχει το ίδιο όνομα με τον τίτλο του βιβλίου;","options":["Jean Valjean","Gregor Samsa","Raskolnikov","Martin Eden"],"correct":3,"sourceId":"1783","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Martin Eden». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2100","question":"Ποιος σκηνοθέτησε τις ταινίες «Ivan's Childhood», «Solaris» και «Mirror»;","options":["Ingmar Bergman","Andrei Tarkovsky","Francis Ford Coppola","Federico Fellini"],"correct":1,"sourceId":"2100","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Andrei Tarkovsky. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-2143","question":"Ποιος σκηνοθέτησε τα «Natural Born Killers» και «JFK»;","options":["James Cameron","Oliver Stone","Stanley Kubrick","Quentin Tarantino"],"correct":1,"sourceId":"2143","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Oliver Stone. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-690","question":"Ποιος μαθηματικός, γνωστός ως «πρίγκιπας των μαθηματικών», έλυσε ως παιδί ένα πρόβλημα αθροίσματος με έξυπνο δικό του τρόπο;","options":["Ευκλείδης","Gödel","Gauss","Πυθαγόρας"],"correct":2,"sourceId":"690","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Gauss». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-939","question":"Ποιος συνέθεσε το μπαλέτο «Ο Καρυοθραύστης»;","options":["Pyotr Ilyich Tchaikovsky","Johannes Brahms","Frédéric Chopin","Maurice Ravel"],"correct":0,"sourceId":"939","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Pyotr Ilyich Tchaikovsky». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-940","question":"Πώς ονομάζεται το μέρος του ουίσκι που εξατμίζεται από το βαρέλι κατά την παλαίωση;","options":["Το μερίδιο της γης","Το μερίδιο του Διονύσου","Το μερίδιο της δρυός","Το μερίδιο των αγγέλων"],"correct":3,"sourceId":"940","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Το μερίδιο των αγγέλων». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1739","question":"Σε ποιο είδος πιγκουίνου το αρσενικό κρατά και προστατεύει το αυγό μετά την ωοτοκία;","options":["Αυτοκρατορικός πιγκουίνος","Φαλακρός αετός","Πάπια Πεκίνου","Κούκος"],"correct":0,"sourceId":"1739","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αυτοκρατορικός πιγκουίνος». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1927","question":"Από ποιον πρόεδρο των ΗΠΑ πήρε το όνομά του το «teddy bear»;","options":["Thomas Edison","John F. Kennedy","James Jones","Theodore Roosevelt"],"correct":3,"sourceId":"1927","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Theodore Roosevelt». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2265","question":"Στην αρχαία αιγυπτιακή παράδοση, τι τοποθετείται στην άλλη πλευρά της ζυγαριάς απέναντι από την καρδιά του νεκρού;","options":["Ένα φτερό","Χρυσό φύλλο","Σπόρος σύκου","Τρίχα"],"correct":0,"sourceId":"2265","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ένα φτερό». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-menti-nepal-flag","question":"Ποια χώρα έχει τη μοναδική εθνική σημαία που δεν είναι τετράπλευρη;","options":["Νεπάλ","Μπουτάν","Ελβετία","Κατάρ"],"correct":0,"trivia":"Η σημαία του Νεπάλ αποτελείται από δύο ενωμένα τριγωνικά λάβαρα και είναι η μοναδική εθνική σημαία με μη τετράπλευρο σχήμα.","sourceId":"flags-4","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-bermuda-flag","question":"Ποια χώρα ή επικράτεια έχει στη σημαία της έμβλημα που απεικονίζει ναυάγιο;","options":["Βερμούδες","Μάλτα","Φίτζι","Μπαχάμες"],"correct":0,"trivia":"Το έμβλημα των Βερμούδων δείχνει το ναυάγιο του Sea Venture το 1609, γεγονός που συνδέεται με την αγγλική εγκατάσταση στα νησιά.","sourceId":"flags-8","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-menti-danube-capitals","question":"Από πόσες εθνικές πρωτεύουσες περνά ο Δούναβης;","options":["2","3","4","5"],"correct":2,"trivia":"Ο Δούναβης περνά από τέσσερις πρωτεύουσες: Βιέννη, Μπρατισλάβα, Βουδαπέστη και Βελιγράδι.","sourceId":"capitals-1","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-oman-borders","question":"Με ποιες τρεις χώρες έχει χερσαία σύνορα το Ομάν;","options":["Υεμένη, ΗΑΕ και Σαουδική Αραβία","Υεμένη, Κατάρ και Ιράκ","ΗΑΕ, Ιορδανία και Κουβέιτ","Σαουδική Αραβία, Μπαχρέιν και Κατάρ"],"correct":0,"trivia":"Το Ομάν συνορεύει χερσαία με την Υεμένη, τα Ηνωμένα Αραβικά Εμιράτα και τη Σαουδική Αραβία.","sourceId":"25","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-menti-sudan-pyramids","question":"Ποια χώρα έχει περισσότερες γνωστές αρχαίες πυραμίδες από την Αίγυπτο;","options":["Σουδάν","Μεξικό","Αιθιοπία","Ιράκ"],"correct":0,"trivia":"Το Σουδάν φιλοξενεί εκατοντάδες πυραμίδες του βασιλείου του Κους, ιδιαίτερα στην περιοχή της Μερόης.","sourceId":"countries-6","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-gambia-senegal","question":"Με ποια χώρα μοιράζεται η Γκάμπια όλα τα χερσαία σύνορά της;","options":["Γουινέα","Σενεγάλη","Μάλι","Γουινέα-Μπισάου"],"correct":1,"trivia":"Η Γκάμπια είναι μια στενή χώρα γύρω από τον ποταμό Γκάμπια και, εκτός από την ακτή της στον Ατλαντικό, περιβάλλεται από τη Σενεγάλη.","sourceId":"21","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-buzz-new-guinea","question":"Ποιο είναι το δεύτερο μεγαλύτερο νησί του κόσμου μετά τη Γροιλανδία;","options":["Βόρνεο","Νέα Γουινέα","Μαδαγασκάρη","Σουμάτρα"],"correct":1,"trivia":"Η Νέα Γουινέα είναι το δεύτερο μεγαλύτερο νησί του κόσμου και πολιτικά μοιράζεται ανάμεσα στην Ινδονησία και την Παπούα Νέα Γουινέα.","sourceId":"69-adapted","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-buzz-albania-lek","question":"Ποιο είναι το νόμισμα της Αλβανίας;","options":["Λέου","Λεκ","Λάρι","Δηνάριο"],"correct":1,"trivia":"Το αλβανικό νόμισμα ονομάζεται lek. Ο πληθυντικός στα αλβανικά είναι lekë.","sourceId":"50","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"}],"3000":[{"id":"src-1893","question":"Σε ποιο άθλημα θεωρείται θρύλος ο Tiger Woods;","options":["Γκολφ","Κρίκετ","Τένις","Μπέιζμπολ"],"correct":0,"sourceId":"1893","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γκολφ». Ο όρος ή το αντικείμενο της ερώτησης αποτελεί χαρακτηριστικό αυτού του αθλήματος."},{"id":"src-901","question":"Από πού προέρχονται τα ονόματα πλανητών όπως ο Ουρανός, ο Ποσειδώνας, ο Δίας, ο Άρης και ο Ερμής;","options":["Αρχαίες πόλεις","Θρησκευτικούς ηγέτες","Μυθολογικούς θεούς","Τους εξερευνητές τους"],"correct":2,"sourceId":"901","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μυθολογικούς θεούς». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2060","question":"Σε ποια από τις παρακάτω πόλεις το νερό βράζει σε χαμηλότερη θερμοκρασία λόγω μεγαλύτερου υψομέτρου;","options":["Σινώπη","Ερζερούμ","Χατάι","Σμύρνη"],"correct":1,"sourceId":"2060","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ερζερούμ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-585","question":"Ποια υπηκοότητα απέκτησε ο Gérard Depardieu το 2013;","options":["Ρωσική","Ελβετική","Τουρκική","Βελγική"],"correct":0,"sourceId":"585","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ρωσική». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-468","question":"Τι συμβαίνει στο τέλος του μυθιστορήματος «Τα παιδιά της οδού Παλ» με το οικόπεδο όπου έπαιζαν οι ήρωες;","options":["Χτίζεται πάνω του κτίριο","Γίνεται πάρκο","Γίνεται χώρος στάθμευσης","Στήνεται μνημείο"],"correct":0,"sourceId":"468","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Χτίζεται πάνω του κτίριο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1125","question":"Ποιο μυθιστόρημα του José Mauro de Vasconcelos αφηγείται τις περιπέτειες του μικρού Ζεζέ;","options":["Ο Μικρός Πρίγκιπας","Το Πορτοκάλι μου","Το Βαμμένο Πουλί","Ο Παπουτσωμένος Γάτος"],"correct":1,"sourceId":"1125","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Το Πορτοκάλι μου». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1274","question":"Ποιος έγραψε το αντιπολεμικό μυθιστόρημα «Ουδέν νεώτερον από το Δυτικό Μέτωπο»;","options":["Mario Puzo","Erich Maria Remarque","Nikolai Gogol","Émile Zola"],"correct":1,"sourceId":"1274","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το έργο που αναφέρεται στην ερώτηση γράφτηκε από τον/την Erich Maria Remarque. Είναι το στοιχείο που συνδέει τον δημιουργό με το συγκεκριμένο έργο."},{"id":"src-1288","question":"Ποιο έργο του Dostoevsky αφηγείται μια σύντομη ερωτική ιστορία τεσσάρων νυχτών στην Αγία Πετρούπολη;","options":["Λευκές Νύχτες","Ο Παίκτης","Ο Ηλίθιος","Έγκλημα και Τιμωρία"],"correct":0,"sourceId":"1288","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λευκές Νύχτες». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1403","question":"Ποιο αυτοβιογραφικό έργο του Henri Charrière έγινε γνωστό και από την κινηματογραφική του μεταφορά;","options":["Papillon","Ο Γλάρος","Ο Κόμης Μοντεχρίστο","Martin Eden"],"correct":0,"sourceId":"1403","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Papillon». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1537","question":"Ποιος σκηνοθέτησε τις ταινίες «Babel», «21 Grams» και «Amores Perros»;","options":["James Cameron","Alejandro G. Iñárritu","Tim Burton","Oliver Stone"],"correct":1,"sourceId":"1537","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Alejandro G. Iñárritu. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1682","question":"Ποιος διάσημος πίνακας ενέπνευσε ταινία με πρωταγωνιστές τη Scarlett Johansson και τον Colin Firth;","options":["Οι Δεσποινίδες της Αβινιόν","Mona Lisa","Το Κορίτσι με το Μαργαριταρένιο Σκουλαρίκι","Olympia"],"correct":2,"sourceId":"1682","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Το Κορίτσι με το Μαργαριταρένιο Σκουλαρίκι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1697","question":"Ποιος σκηνοθέτησε τις ταινίες «Ran», «Dreams» και «Rhapsody in August»;","options":["Andrei Tarkovsky","John Ford","Bernardo Bertolucci","Akira Kurosawa"],"correct":3,"sourceId":"1697","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Akira Kurosawa. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1912","question":"Ποιος Ρώσος συγγραφέας έγραψε τις «Νεκρές Ψυχές»;","options":["Pablo Neruda","Maxim Gorky","Edgar Allan Poe","Nikolai Gogol"],"correct":3,"sourceId":"1912","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Nikolai Gogol». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2166","question":"Ποιος σκηνοθέτησε τα «Underground», «Arizona Dream» και «Time of the Gypsies»;","options":["Emir Kusturica","Luc Besson","Guy Ritchie","Coen Brothers"],"correct":0,"sourceId":"2166","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Emir Kusturica. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-1045","question":"Με ποιο κριτήριο ονομάζονται συνήθως επίσημα οι μετεωρίτες που βρίσκονται στη Γη;","options":["Από τον τόπο όπου βρέθηκαν","Από ζωγράφους της Αναγέννησης","Από τον αστερισμό προέλευσής τους","Από αστρονόμους"],"correct":0,"sourceId":"1045","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Από τον τόπο όπου βρέθηκαν». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-441","question":"Η μάσκα του δολοφόνου στην ταινία «Scream» θυμίζει έντονα ποιο διάσημο έργο ζωγραφικής;","options":["The Kiss του Klimt","The Scream του Edvard Munch","Έργο του Caravaggio","Αυτοπροσωπογραφία της Frida Kahlo"],"correct":1,"sourceId":"441","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «The Scream του Edvard Munch». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1538","question":"Για ποιον βασικό βιολογικό λόγο τα θηλυκά κουνούπια χρειάζονται αίμα;","options":["Για να πετούν γρηγορότερα","Για να παράγουν ήχο","Για να ζεσταθούν","Για την ανάπτυξη των αυγών τους"],"correct":3,"sourceId":"1538","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Για την ανάπτυξη των αυγών τους». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1957","question":"Ποιος φυσικός ήταν επιστημονικός διευθυντής του Los Alamos στο Manhattan Project;","options":["J. Robert Oppenheimer","Richard Feynman","Gustav Hertz","Leonardo Fibonacci"],"correct":0,"sourceId":"1957","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «J. Robert Oppenheimer». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-menti-lesotho-border","question":"Ποια χώρα περιβάλλει πλήρως το Λεσότο;","options":["Νότια Αφρική","Μποτσουάνα","Εσουατίνι","Ναμίμπια"],"correct":0,"trivia":"Το Λεσότο είναι περίκλειστο κράτος και αποτελεί πλήρη θύλακα μέσα στη Νότια Αφρική.","sourceId":"general-15","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-rd-sargasso","question":"Ποια θάλασσα είναι γνωστή επειδή δεν έχει χερσαία ακτογραμμή και ορίζεται από ωκεάνια ρεύματα;","options":["Θάλασσα των Σαργασσών","Θάλασσα της Ιάβας","Θάλασσα Μπάρεντς","Θάλασσα των Κοραλλιών"],"correct":0,"trivia":"Η Θάλασσα των Σαργασσών βρίσκεται στον Βόρειο Ατλαντικό και τα όριά της σχηματίζονται από μεγάλα ωκεάνια ρεύματα, όχι από στεριά.","sourceId":"27","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"NOAA"},{"id":"geo-rd-java-trench","question":"Σε ποιον ωκεανό βρίσκεται η Τάφρος της Ιάβας;","options":["Ειρηνικό","Ινδικό","Ατλαντικό","Αρκτικό"],"correct":1,"trivia":"Η Τάφρος της Ιάβας, γνωστή και ως Sunda Trench, βρίσκεται στον ανατολικό Ινδικό Ωκεανό νότια της Ινδονησίας.","sourceId":"37","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/"},{"id":"geo-buzz-cape-agulhas","question":"Ποιο είναι το νοτιότερο σημείο της αφρικανικής ηπείρου;","options":["Ακρωτήριο της Καλής Ελπίδας","Ακρωτήριο Αγκούλας","Ακρωτήριο Βέρντε","Ακρωτήριο Χορν"],"correct":1,"trivia":"Το Ακρωτήριο Αγκούλας είναι το νοτιότερο σημείο της Αφρικής. Το πιο διάσημο Ακρωτήριο της Καλής Ελπίδας βρίσκεται λίγο βορειοδυτικότερα.","sourceId":"65","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-buzz-reykjavik","question":"Ποια είναι η βορειότερη πρωτεύουσα ανεξάρτητου κράτους στον κόσμο;","options":["Όσλο","Ελσίνκι","Ρέικιαβικ","Ταλίν"],"correct":2,"trivia":"Το Ρέικιαβικ της Ισλανδίας βρίσκεται περίπου στον 64ο παράλληλο και θεωρείται η βορειότερη εθνική πρωτεύουσα κυρίαρχου κράτους.","sourceId":"70","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"}],"4000":[{"id":"src-566","question":"Πώς ονομάζεται το γνωστό νοητικό πείραμα με ένα ζώο σε κλειστό κουτί που μπορεί να θεωρείται ταυτόχρονα ζωντανό και νεκρό;","options":["Η γάτα του Σρέντινγκερ","Το ποντίκι του Σρέντινγκερ","Ο πίθηκος του Σρέντινγκερ","Το κουνέλι του Σρέντινγκερ"],"correct":0,"sourceId":"566","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Η γάτα του Σρέντινγκερ». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-988","question":"Από πόσα ξεχωριστά μικρότερα κομμάτια αποτελείται ένας τυπικός κύβος του Ρούμπικ, αν δεν μετρήσουμε τον εσωτερικό μηχανισμό;","options":["26","32","42","46"],"correct":0,"sourceId":"988","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο σωστός αριθμός είναι «26». Η αριθμητική λεπτομέρεια είναι το βασικό fact που ξεχωρίζει τη σωστή επιλογή."},{"id":"src-776","question":"Ποια αφρικανική χώρα, που δεν αποικίστηκε από ευρωπαϊκή δύναμη, ενέπνευσε με τα χρώματα της σημαίας της πολλές άλλες αφρικανικές σημαίες;","options":["Λιβερία","Αιθιοπία","Κένυα","Αγκόλα"],"correct":1,"sourceId":"776","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αιθιοπία». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1474","question":"Ηγέτης ποιας χώρας υπήρξε ο Václav Havel;","options":["Γιουγκοσλαβία","Τσεχοσλοβακία","Ολλανδία","Ελβετία"],"correct":1,"sourceId":"1474","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Τσεχοσλοβακία». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2185","question":"Ποιος ναυτικός όρος σημαίνει προσδιορισμό κατεύθυνσης ως προς ένα σταθερό σημείο αναφοράς;","options":["Επιφάνεια","Αλαμπάντα","Διόπτευση","Βολίδα"],"correct":2,"sourceId":"2185","sourceLevel":5,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Διόπτευση». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-2241","question":"Η οικονομική φράση «laissez faire» συνδέεται με ποια συμπληρωματική διατύπωση;","options":["Αφήστε τους να κερδίσουν","Αφήστε τους να μιλήσουν","Αφήστε τους να περάσουν","Αφήστε τους να αγοράσουν"],"correct":2,"sourceId":"2241","sourceLevel":6,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αφήστε τους να περάσουν». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-840","question":"Ποιο διάσημο πείραμα έδειξε άμεσα την περιστροφή της Γης και έδωσε τίτλο και σε μυθιστόρημα του Umberto Eco;","options":["Η γάτα του Schrödinger","Ο σκύλος του Pavlov","Το εκκρεμές του Foucault","Η λωρίδα του Möbius"],"correct":2,"sourceId":"840","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Το εκκρεμές του Foucault». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1267","question":"Ποιος σκηνοθέτησε την τριλογία ταινιών «Μπλε», «Λευκό» και «Κόκκινο»;","options":["Emir Kusturica","Krzysztof Kieślowski","Stanley Kubrick","Roman Polanski"],"correct":1,"sourceId":"1267","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Τη σκηνοθεσία των έργων που αναφέρονται έχει ο Krzysztof Kieślowski. Η αναγνώριση κοινών δημιουργών είναι συχνό μοτίβο σε ερωτήσεις κινηματογράφου."},{"id":"src-409","question":"Η φράση «φοβού τους Δαναούς και δώρα φέροντας» συνδέεται με ποιο τέχνασμα της ελληνικής μυθολογίας;","options":["Δούρειος Ίππος","Σινδόνη του Τορίνο","Λόγχη του Πεπρωμένου","Excalibur"],"correct":0,"sourceId":"409","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Δούρειος Ίππος». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1412","question":"Πώς ονομάζεται η σπάνια νευρολογική διαταραχή στην οποία ένα χέρι φαίνεται να κινείται χωρίς εκούσιο έλεγχο;","options":["Σύνδρομο ελεύθερου χεριού","Σύνδρομο ξένου χεριού","Σύνδρομο ασυνείδητου χεριού","Σύνδρομο ανήσυχου χεριού"],"correct":1,"sourceId":"1412","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Σύνδρομο ξένου χεριού». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"geo-rd-south-africa-capitals","question":"Ποια χώρα έχει τρεις επίσημες πρωτεύουσες με διαφορετικούς θεσμικούς ρόλους;","options":["Νότια Αφρική","Βολιβία","Σρι Λάνκα","Τανζανία"],"correct":0,"trivia":"Η Νότια Αφρική έχει τρεις πρωτεύουσες: Πρετόρια για την εκτελεστική εξουσία, Κέιπ Τάουν για τη νομοθετική και Μπλουμφοντέιν για τη δικαστική.","sourceId":"28","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"South African Government"},{"id":"geo-menti-africa-four-hemispheres","question":"Ποια ήπειρος έχει εδάφη και στα τέσσερα ημισφαίρια της Γης;","options":["Ασία","Αφρική","Νότια Αμερική","Ευρώπη"],"correct":1,"trivia":"Η Αφρική διασχίζεται τόσο από τον Ισημερινό όσο και από τον πρώτο μεσημβρινό, γι’ αυτό εκτείνεται σε βόρειο, νότιο, ανατολικό και δυτικό ημισφαίριο.","sourceId":"general-1","sourceLevel":null,"source":"Mentimeter — 100+ Best Geography Trivia Questions (2026)","sourceUrl":"https://www.mentimeter.com/blog/education/best-geography-quizzes-and-trivia-questions"},{"id":"geo-buzz-asia-extremes","question":"Ποια ήπειρος περιλαμβάνει τόσο το υψηλότερο όσο και το χαμηλότερο σημείο της ξηράς της Γης;","options":["Αφρική","Ασία","Βόρεια Αμερική","Νότια Αμερική"],"correct":1,"trivia":"Η Ασία περιλαμβάνει το Έβερεστ, το υψηλότερο σημείο της ξηράς, και την περιοχή της Νεκράς Θάλασσας, τη χαμηλότερη εκτεθειμένη ξηρά.","sourceId":"47","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"}],"5000":[{"id":"src-1021","question":"Ποιος διάσημος επιστήμονας χρησιμοποίησε χρήματα από το Νόμπελ του για οικονομικές υποχρεώσεις προς την πρώην σύζυγό του;","options":["Ιβάν Παβλόφ","Άλμπερτ Αϊνστάιν","Αλεξάντερ Φλέμινγκ","Πιερ Κιουρί"],"correct":1,"sourceId":"1021","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Άλμπερτ Αϊνστάιν». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-374","question":"Ποιος επιστήμονας έχει συνδεθεί με την επιγραφή «μετρούσα τους ουρανούς, τώρα μετρώ τις σκιές της Γης»;","options":["Κέπλερ","Κοπέρνικος","Γαλιλαίος","Νεύτων"],"correct":0,"sourceId":"374","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κέπλερ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-450","question":"Σε ποια χώρα μια γυναίκα πρόεδρος διόρισε τη μητέρα της πρωθυπουργό το 1994;","options":["Νέα Ζηλανδία","Φιλιππίνες","Πακιστάν","Σρι Λάνκα"],"correct":3,"sourceId":"450","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σρι Λάνκα». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-560","question":"Ποια μικρή ευρωπαϊκή χώρα είχε διαφημιστεί ότι μπορούσε να νοικιαστεί ολόκληρη για ιδιωτικές εκδηλώσεις;","options":["Λιχτενστάιν","Ισλανδία","Μαλδίβες","Μονακό"],"correct":0,"sourceId":"560","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λιχτενστάιν». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-430","question":"Ποιος σκηνοθέτης ονόμασε ταινία του «8½» μετρώντας τις προηγούμενες μεγάλου και μικρού μήκους δουλειές του;","options":["Akira Kurosawa","Bernardo Bertolucci","Federico Fellini","Woody Allen"],"correct":2,"sourceId":"430","sourceLevel":7,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Federico Fellini». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-956","question":"Ποιο άλλο επάγγελμα ασκούσαν συχνά οι κουρείς στην Ευρώπη επί πολλούς αιώνες;","options":["Χειρουργός","Αστρονόμος","Χημικός","Χρυσοχόος"],"correct":0,"sourceId":"956","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Χειρουργός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1029","question":"Ποια ιστορική δολοφονία πραγματοποιήθηκε τελικά όταν ο δράστης συνάντησε τυχαία το όχημα του στόχου μετά από αποτυχημένη προηγούμενη απόπειρα;","options":["Ernesto Che Guevara","Τσάρος Νικόλαος Β΄","Benito Mussolini","Αρχιδούκας Franz Ferdinand"],"correct":3,"sourceId":"1029","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αρχιδούκας Franz Ferdinand». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-431","question":"Ποιος πολιτικός όρος πήρε το όνομά του από τον Nicolas Chauvin, έναν υπερβολικά πατριώτη στρατιώτη της ναπολεόντειας παράδοσης;","options":["Αναρχισμός","Σοβινισμός","Ντανταϊσμός","Βανδαλισμός"],"correct":1,"sourceId":"431","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σοβινισμός». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1810","question":"Από ποιο άθλημα προήλθε ο όρος «hat-trick»;","options":["Ποδόσφαιρο","Μπέιζμπολ","Κρίκετ","Χόκεϊ"],"correct":2,"sourceId":"1810","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Κρίκετ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2243","question":"Από χαρακτήρα ποιας ταινίας του Federico Fellini προέρχεται η λέξη «paparazzi»;","options":["La Dolce Vita","Breakfast at Tiffany's","Amarcord","8½"],"correct":0,"sourceId":"2243","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «La Dolce Vita». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-576","question":"Ποιος Ρώσος συγγραφέας τιμήθηκε με το Νόμπελ Λογοτεχνίας το 1958 αλλά αναγκάστηκε από τις σοβιετικές αρχές να το αρνηθεί;","options":["Boris Pasternak","Mikhail Sholokhov","Aleksandr Solzhenitsyn","Maxim Gorky"],"correct":0,"sourceId":"576","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Boris Pasternak». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1363","question":"Από ποιο αξίωμα της αρχαίας Ρώμης προέρχεται η λέξη «λογοκρισία» μέσω του λατινικού censor;","options":["Δημόσιος αξιωματούχος","Ιερέας","Μεταφραστής","Ιστορικός"],"correct":0,"sourceId":"1363","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Δημόσιος αξιωματούχος». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2168","question":"Με ποια αρχαία πόλη συνδέεται ετυμολογικά και ιστορικά η περγαμηνή;","options":["Αλεξάνδρεια","Πέργαμος","Δαμασκός","Πάταρα"],"correct":1,"sourceId":"2168","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Πέργαμος». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2189","question":"Τι σημαίνει η αραβική λέξη «jabal/jebel» στο όνομα Γιβραλτάρ;","options":["Στήλη","Πέρασμα","Κανάλι","Βουνό"],"correct":3,"sourceId":"2189","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Βουνό». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-2244","question":"Πώς αποκαλείται το βαλιτσάκι έκτακτης ανάγκης που συνοδεύει τον πρόεδρο των ΗΠΑ και σχετίζεται με διαδικασίες πυρηνικής εντολής;","options":["Nuclear Football","Nuclear Bowling","Nuclear Baseball","Nuclear Basketball"],"correct":0,"sourceId":"2244","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Nuclear Football». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-443","question":"Ποια διεθνής ημέρα καθιέρωσε ο ΟΗΕ να εορτάζεται στις 20 Μαρτίου;","options":["Διεθνής Ημέρα Ευτυχίας","Ημέρα Φιλίας","Ημέρα Αδελφοσύνης","Ημέρα Αγάπης"],"correct":0,"sourceId":"443","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Διεθνής Ημέρα Ευτυχίας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1422","question":"Τι σημαίνει η λέξη «Inuit» στη γλώσσα των Inuit;","options":["Ψύχραιμοι","Ιχθυοφάγοι","Λευκοί","Άνθρωποι"],"correct":3,"sourceId":"1422","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Άνθρωποι». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"geo-buzz-iran-two-waters","question":"Ποια χώρα βρέχεται τόσο από την Κασπία Θάλασσα όσο και από τον Περσικό Κόλπο;","options":["Ιράν","Ιράκ","Αζερμπαϊτζάν","Τουρκμενιστάν"],"correct":0,"trivia":"Το Ιράν εκτείνεται από την Κασπία Θάλασσα στα βόρεια έως τον Περσικό Κόλπο και τον Κόλπο του Ομάν στα νότια.","sourceId":"19","sourceLevel":null,"source":"BuzzFeed — Around the World in Geography Trivia (2026)","sourceUrl":"https://www.buzzfeed.com/kellyrissman/geography-trivia-questions"},{"id":"geo-rd-congo-deepest","question":"Ποιος ποταμός θεωρείται ο βαθύτερος στον κόσμο;","options":["Αμαζόνιος","Κονγκό","Νείλος","Γιανγκτσέ"],"correct":1,"trivia":"Ο ποταμός Κονγκό έχει μετρημένα βάθη άνω των 200 μέτρων σε ορισμένα σημεία και θεωρείται ο βαθύτερος ποταμός του κόσμου.","sourceId":"103","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"USGS"},{"id":"geo-nibble-france-timezones","question":"Ποια χώρα καλύπτει τις περισσότερες ζώνες ώρας όταν συνυπολογίζονται τα υπερπόντια εδάφη της;","options":["Ρωσία","ΗΠΑ","Γαλλία","Αυστραλία"],"correct":2,"trivia":"Η Γαλλία ξεπερνά τη Ρωσία σε αριθμό ζωνών ώρας όταν μετρηθούν τα υπερπόντια εδάφη της σε διαφορετικά σημεία του πλανήτη.","sourceId":"timezones-france","sourceLevel":null,"source":"Nibble — Geography Trivia (2026)","sourceUrl":"https://nibble-app.com/blog/geography-trivia","verifiedBy":"Guinness World Records"}],"7500":[{"id":"src-489","question":"Από τι προέρχεται η λέξη «υγιεινή» σύμφωνα με την ετυμολογία της;","options":["Το νερό της βροχής","Ελληνική θεότητα","Λατινική λέξη για το λευκό","Χημική ουσία"],"correct":1,"sourceId":"489","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ελληνική θεότητα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1827","question":"Τι σημαίνει κυριολεκτικά η λέξη «γκέισα» στην ιαπωνική παράδοση;","options":["Οδηγός","Καλλιτέχνης","Οινοχόος","Κηπουρός"],"correct":1,"sourceId":"1827","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Καλλιτέχνης». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"src-1176","question":"Σε ποια χώρα ιδρύθηκε το 2006 το σατιρικό «Κόμμα του Σκύλου με τις Δύο Ουρές»;","options":["Ιρλανδία","Μεξικό","Ουγγαρία","Γαλλία"],"correct":2,"sourceId":"1176","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ουγγαρία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-723","question":"Ποια χώρα προβλέπει υπό προϋποθέσεις τη δυνατότητα μεταθανάτιου γάμου;","options":["Νιγηρία","Ινδία","Περού","Γαλλία"],"correct":3,"sourceId":"723","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γαλλία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1138","question":"Ποιος συγγραφέας έγραψε το «On the Road» σε έναν μεγάλο συνεχόμενο κύλινδρο χαρτιού;","options":["Charles Bukowski","Boris Vian","Aldous Huxley","Jack Kerouac"],"correct":3,"sourceId":"1138","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Jack Kerouac». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1913","question":"Ποιο τρόφιμο βρέθηκε στο επίκεντρο απόφασης του Ανώτατου Δικαστηρίου των ΗΠΑ το 1893 για το αν θα θεωρείται φρούτο ή λαχανικό για τελωνειακούς σκοπούς;","options":["Κολοκύθα","Ντομάτα","Λεμόνι","Αγκινάρα"],"correct":1,"sourceId":"1913","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ντομάτα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-632","question":"Στο «Συμπόσιο» του Πλάτωνα, ποιος θεός χωρίζει τους αρχικούς διπλούς ανθρώπους στα δύο, σύμφωνα με τον μύθο που αφηγείται ο Αριστοφάνης;","options":["Δίας","Απόλλων","Ερμής","Μήτις"],"correct":0,"sourceId":"632","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Δίας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1661","question":"Από πού πήρε το όνομά του ο διάσημος απολιθωμένος σκελετός ανθρωπίδη «Lucy»;","options":["Από ηθοποιό του Indiana Jones","Από την πρώτη γυναίκα αρχαιολόγο","Από θεότητα του φωτός","Από τραγούδι των Beatles"],"correct":3,"sourceId":"1661","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Από τραγούδι των Beatles». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2076","question":"Τι ζώο ήταν ο Wojtek, που υπηρέτησε με Πολωνούς στρατιώτες στον Β΄ Παγκόσμιο Πόλεμο και βοήθησε στη μεταφορά πυρομαχικών;","options":["Αρκούδα","Πίθηκος","Άλογο","Γάιδαρος"],"correct":0,"sourceId":"2076","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Το ζώο είναι «Αρκούδα». Το γνώρισμα που περιγράφεται στην ερώτηση είναι χαρακτηριστικό που βοηθά στην αναγνώρισή του."},{"id":"src-1521","question":"Τι σημαίνει το λατινικό μότο «E Pluribus Unum»;","options":["Γνωρίζουμε τα δικαιώματά μας","Από τους πολλούς, ένας","Δικαιοσύνη για όλους","Ελευθερία και ισότητα"],"correct":1,"sourceId":"1521","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σημασία που ζητείται είναι «Από τους πολλούς, ένας». Πρόκειται για την ετυμολογική ή καθιερωμένη έννοια του όρου της ερώτησης."},{"id":"geo-rd-chimborazo","question":"Ποια κορυφή είναι το σημείο της επιφάνειας της Γης που βρίσκεται μακρύτερα από το κέντρο του πλανήτη;","options":["Έβερεστ","K2","Τσιμποράσο","Ακονκάγκουα"],"correct":2,"trivia":"Το Τσιμποράσο στον Ισημερινό κερδίζει λόγω του ισημερινού εξογκώματος της Γης: η κορυφή του βρίσκεται μακρύτερα από το κέντρο της Γης από ό,τι η κορυφή του Έβερεστ.","sourceId":"108","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"NASA"},{"id":"geo-rd-potala","question":"Πώς ονομάζεται το ιστορικό παλάτι που δεσπόζει πάνω από τη Λάσα του Θιβέτ;","options":["Παλάτι Ποτάλα","Αλάμπρα","Παλάτι Τοπ Καπί","Παλάτι Πένα"],"correct":0,"trivia":"Το Παλάτι Ποτάλα βρίσκεται πάνω από τη Λάσα σε υψόμετρο άνω των 3.600 μέτρων και υπήρξε για αιώνες χειμερινή έδρα των Δαλάι Λάμα.","sourceId":"54-landmark","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"UNESCO World Heritage Centre"}],"10000":[{"id":"src-826","question":"Ποια λέξη που πέρασε από τα λατινικά σε πολλές γλώσσες σημαίνει κυριολεκτικά «θα πλύνω»;","options":["Αρματούρα","Λαβαντόριο","Τζακούζι","Σαμπουάν"],"correct":1,"sourceId":"826","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λαβαντόριο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1969","question":"Ποιο είναι το αντικείμενο μελέτης της γελωτολογίας;","options":["Το γέλιο","Το γαργάλημα","Η αφοσίωση","Η ζήλια"],"correct":0,"sourceId":"1969","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Το γέλιο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1093","question":"Σε ποια σημερινή πόλη βρίσκεται κτίσμα του 1ου αιώνα μ.Χ. που έχει χαρακτηριστεί ως ένα από τα αρχαιότερα δημοκρατικά βουλευτήρια;","options":["Αττάλεια","Θεσσαλονίκη","Ιερουσαλήμ","Αλεξάνδρεια"],"correct":0,"sourceId":"1093","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αττάλεια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-693","question":"Σε ποια χώρα είχε γίνει καμπάνια ώστε ο Roman Abramovich να την αγοράσει, σε περίοδο οικονομικών δυσκολιών;","options":["Πορτογαλία","Λετονία","Σερβία","Ισλανδία"],"correct":1,"sourceId":"693","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Λετονία». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-752","question":"Στις πρώτες μορφές του μπάσκετ, ποια σημερινή βασική ενέργεια δεν επιτρεπόταν από τους αρχικούς κανόνες;","options":["Ντρίμπλα","Πάσα με ένα χέρι","Ομιλία στον διαιτητή","Ομιλία σε συμπαίκτη"],"correct":0,"sourceId":"752","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ντρίμπλα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-602","question":"Ποιος ηγέτης των Cherokee δημιούργησε σύστημα γραφής για τη γλώσσα τους και έδωσε το όνομά του στη σεκόγια;","options":["Sequoyah","Eucalyptus","Baobab","Bonsai"],"correct":0,"sourceId":"602","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Sequoyah». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2234","question":"Πώς βρέθηκαν το 2007 δύο νεολιθικοί σκελετοί περίπου 5.000 ετών κοντά στη Μάντοβα της Ιταλίας, γνωστοί ως «Lovers of Valdaro»;","options":["Δεμένοι με χειροπέδες","Αγκαλιασμένοι","Γονατιστοί","Με δεμένα μάτια"],"correct":1,"sourceId":"2234","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αγκαλιασμένοι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1501","question":"Ποια λέξη χρησιμοποίησε ο Gerardus Mercator για τη συλλογή χαρτών του, καθιερώνοντας έναν όρο που χρησιμοποιούμε ακόμη;","options":["Λεξικό","Κατάλογος","Ανθολογία","Άτλας"],"correct":3,"sourceId":"1501","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Άτλας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1520","question":"Ποιος φιλόσοφος, γνωστός για την απαισιόδοξη σκέψη του, προγραμμάτισε διαλέξεις την ίδια ώρα με τον Hegel στο Βερολίνο;","options":["Jean-Jacques Rousseau","Friedrich Nietzsche","Friedrich Engels","Arthur Schopenhauer"],"correct":3,"sourceId":"1520","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Arthur Schopenhauer». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1641","question":"Ποια καλλιτεχνική τεχνική πήρε το όνομά της από τον Étienne de Silhouette, Γάλλο υπουργό Οικονομικών του 18ου αιώνα;","options":["Γκουάς","Σιλουέτα","Σκίτσο","Παστέλ"],"correct":1,"sourceId":"1641","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Σιλουέτα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1885","question":"Ποιος πρόεδρος των ΗΠΑ αστειεύτηκε σε δοκιμή μικροφώνου ότι ο βομβαρδισμός της Ρωσίας θα άρχιζε σε λίγα λεπτά;","options":["Lyndon B. Johnson","Ronald Reagan","Jimmy Carter","Harry Truman"],"correct":1,"sourceId":"1885","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ronald Reagan». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1540","question":"Ποιος ιστορικός ηγέτης, όταν απήχθη από πειρατές, φέρεται να θεώρησε πολύ χαμηλό το λύτρο που ζητούσαν και απαίτησε να το αυξήσουν;","options":["Ιούλιος Καίσαρας","Μέγας Αλέξανδρος","Ιβάν ο Τρομερός","Napoleon Bonaparte"],"correct":0,"sourceId":"1540","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ιούλιος Καίσαρας». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"geo-rd-scoresby","question":"Ποιο τεράστιο σύστημα φιόρδ της Γροιλανδίας αναφέρεται συχνά ως το μεγαλύτερο στον κόσμο;","options":["Sognefjord","Scoresby Sund","Hardangerfjord","Geirangerfjord"],"correct":1,"trivia":"Το Scoresby Sund στην ανατολική Γροιλανδία είναι ένα γιγάντιο, διακλαδισμένο σύστημα φιόρδ και συγκαταλέγεται στα μεγαλύτερα του πλανήτη.","sourceId":"113","sourceLevel":null,"source":"Reader’s Digest — 115 Geography Trivia Questions (2025)","sourceUrl":"https://www.rd.com/list/geography-quiz-101/","verifiedBy":"Visit Greenland / Guinness World Records"}],"20000":[{"id":"src-1587","question":"Πώς ονομάζεται η νομική προειδοποίηση που περιλαμβάνει το δικαίωμα σιωπής και ότι όσα πεις μπορούν να χρησιμοποιηθούν εναντίον σου;","options":["Δικαιώματα Βιτρούβιου","Δικαιώματα Ντρέιφους","Δικαιώματα Μιράντα","Δικαιώματα Μάντισον"],"correct":2,"sourceId":"1587","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Δικαιώματα Μιράντα». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-1392","question":"Τι άφησε στη Σελήνη ο αστροναύτης Charles Duke;","options":["Φωτογραφία της οικογένειάς του","Φορητό ραδιόφωνο","Το ρολόι του παππού του","Μπάλα του μπέιζμπολ"],"correct":0,"sourceId":"1392","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Φωτογραφία της οικογένειάς του». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-998","question":"Πολίτες ποιας χώρας είχαν μηνύσει τη NASA το 1997 ισχυριζόμενοι δικαιώματα πάνω στον Άρη;","options":["Υεμένη","Ινδία","Βόρεια Κορέα","Ιράν"],"correct":0,"sourceId":"998","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Υεμένη». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-464","question":"Πώς ονομάζεται το διεθνές πειραματικό αστικό εγχείρημα στην Ινδία που δημιουργήθηκε με στόχο άνθρωποι διαφορετικών εθνικοτήτων να ζουν μαζί;","options":["Goodville","Auroville","Harmonyville","Ecoville"],"correct":1,"sourceId":"464","sourceLevel":1,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Ο καθιερωμένος όρος είναι «Auroville». Αυτό είναι το όνομα με το οποίο περιγράφεται το φαινόμενο, αντικείμενο ή έννοια της ερώτησης."},{"id":"src-874","question":"Η αρχαία σημιτική λέξη «aleph», από την οποία προέρχονται ονόματα πρώτων γραμμάτων όπως άλφα, σήμαινε αρχικά τι;","options":["Βόδι","Γάιδαρο","Άροτρο","Σπαθί"],"correct":0,"sourceId":"874","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βόδι». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1685","question":"Ποιος Γερμανός δραματουργός, αφού διέφυγε από τη ναζιστική Γερμανία, εργάστηκε για ένα διάστημα ως σεναριογράφος στο Hollywood πριν φύγει από τις ΗΠΑ το 1947;","options":["Hermann Hesse","Friedrich Schiller","Bertolt Brecht","Thomas Mann"],"correct":2,"sourceId":"1685","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Bertolt Brecht». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."}],"30000":[{"id":"src-1718","question":"Σε ποιον αποδίδεται η φράση «Οι φιλόσοφοι απλώς ερμήνευσαν τον κόσμο· το ζήτημα είναι να τον αλλάξουμε»;","options":["Καρλ Μαρξ","Ερνέστο Τσε Γκεβάρα","Μέγας Αλέξανδρος","Μαχάτμα Γκάντι"],"correct":0,"sourceId":"1718","sourceLevel":11,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Καρλ Μαρξ». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1177","question":"Ποια φράση ήταν γραμμένη στο ιερό των Δελφών και συνδέεται με τη σωκρατική σκέψη;","options":["Προς το φως","Γνώθι σαυτόν","Δικαιοσύνη για όλους","Η γνώση είναι δύναμη"],"correct":1,"sourceId":"1177","sourceLevel":11,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Γνώθι σαυτόν». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-637","question":"Ποια τουρκική πόλη είναι ιδιαίτερα γνωστή για τα βερίκοκά της;","options":["Ριζούντα","Μαλάτια","Άγκυρα","Χατάι"],"correct":1,"sourceId":"637","sourceLevel":4,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Μαλάτια». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1362","question":"Ποια πόλη υπήρξε πρωτεύουσα αυτοκρατοριών για περίπου δεκαέξι αιώνες;","options":["Αθήνα","Ιερουσαλήμ","Κάιρο","Κωνσταντινούπολη"],"correct":3,"sourceId":"1362","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η πόλη που ζητείται είναι «Κωνσταντινούπολη». Το χαρακτηριστικό της ερώτησης είναι ένα από τα στοιχεία με τα οποία αναγνωρίζεται η συγκεκριμένη πόλη."},{"id":"src-694","question":"Ποιο τραγούδι έπαιξαν οι αστροναύτες του Gemini 6 το 1965 σε μία από τις πρώτες μουσικές μεταδόσεις από το διάστημα;","options":["Imagine","Rhapsody in Blue","Jingle Bells","The Sound of Silence"],"correct":2,"sourceId":"694","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Jingle Bells». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1669","question":"Ποια χώρα έχει τριμελή συλλογική προεδρία που εκπροσωπεί τρεις κύριες εθνοτικές κοινότητες και εθνικό ύμνο χωρίς επίσημους στίχους;","options":["Ινδία","Αυστραλία","Βοσνία και Ερζεγοβίνη","Νότια Αφρική"],"correct":2,"sourceId":"1669","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βοσνία και Ερζεγοβίνη». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1486","question":"Σε ποιον Ρωμαίο ρήτορα αποδίδεται η φράση «Όταν μιλούν τα όπλα, οι νόμοι σωπαίνουν»;","options":["Albert Einstein","Mahatma Gandhi","Plato","Cicero"],"correct":3,"sourceId":"1486","sourceLevel":11,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Cicero». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."}],"100000":[{"id":"src-1719","question":"Στο πείραμα για την προέλευση της γλώσσας που περιγράφει ο Ηρόδοτος, ποια λέξη λέγεται ότι είπε πρώτη το απομονωμένο παιδί;","options":["Δώσε","Μητέρα","Ψωμί","Νερό"],"correct":2,"sourceId":"1719","sourceLevel":12,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Ψωμί». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1522","question":"Ποια χώρα έχει διαφορετικό έμβλημα στην εμπρός και στην πίσω όψη της σημαίας της;","options":["Σουδάν","Τσεχία","Παραγουάη","Βοσνία και Ερζεγοβίνη"],"correct":2,"sourceId":"1522","sourceLevel":11,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Παραγουάη». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-958","question":"Ανάμεσα σε ποιες δύο χώρες βρίσκεται η λεγόμενη «Γέφυρα χωρίς Επιστροφή»;","options":["Ισραήλ και Παλαιστίνη","Βόρεια και Νότια Κορέα","Αρμενία και Αζερμπαϊτζάν","Τσεχία και Σλοβακία"],"correct":1,"sourceId":"958","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Βόρεια και Νότια Κορέα». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-903","question":"Σε ποια χώρα βρίσκεται το Museum of Bad Art (MOBA);","options":["ΗΠΑ","Ιαπωνία","Αυστραλία","Νορβηγία"],"correct":0,"sourceId":"903","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «ΗΠΑ». Το στοιχείο της ερώτησης συνδέεται γεωγραφικά, ιστορικά ή πολιτισμικά με αυτή τη χώρα."},{"id":"src-1849","question":"Σύμφωνα με τη γενική σχετικότητα, σε ποιο σημείο ενός ψηλού κτιρίου περνά ο χρόνος απειροελάχιστα πιο αργά λόγω ισχυρότερου βαρυτικού πεδίου;","options":["Στον τελευταίο όροφο","Στον μεσαίο όροφο","Στο ισόγειο","Στην ταράτσα"],"correct":2,"sourceId":"1849","sourceLevel":8,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Στο ισόγειο». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-1939","question":"Ποιος αρχαίος επιστήμονας ζήτησε να χαραχθεί στον τάφο του ένα σχήμα κυλίνδρου με εγγεγραμμένη σφαίρα;","options":["Αρχιμήδης","Ali Qushji","Fibonacci","Πυθαγόρας"],"correct":0,"sourceId":"1939","sourceLevel":9,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Αρχιμήδης». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."},{"id":"src-2077","question":"Ποιανού συγγραφέα το όνομα έδωσε ο Gandhi σε κοινότητα στη Νότια Αφρική όπου ζούσαν οικογένειες μελών του κινήματος παθητικής αντίστασης;","options":["Tolstoy","Dostoevsky","Tagore","Andersen"],"correct":0,"sourceId":"2077","sourceLevel":10,"source":"Aydin-Yilmaz-Demirbas Millionaire dataset","trivia":"Η σωστή απάντηση είναι «Tolstoy». Αυτό είναι το βασικό στοιχείο που συνδέει τα δεδομένα της ερώτησης και εξηγεί γιατί οι άλλες επιλογές δεν ταιριάζουν."}]};
let questionBank = QUESTION_BANK;
let game = null;
let lockTimer = null;
let currentAudio = null;
let audienceTimer = null;
let questionAudioToken = 0;
let suspenseAllowed = false;
let audioTransitioning = false;
let playFadeTimer = null;
let playFadeFrame = null;

function formatAmount(v) {
  return "€" + Number(v).toLocaleString("el-GR");
}

function showScreen(name) {
  $("setupScreen").classList.toggle("hidden",name !== "setup");
  $("gameScreen").classList.toggle("hidden",name !== "game");
  $("endScreen").classList.toggle("hidden",name !== "end");
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  try { audio.currentTime = 0; } catch {}
}

function playExclusive(id,onEnded) {
  if (currentAudio) stopAudio(currentAudio);

  const audio = $(id);
  stopAudio(audio);
  currentAudio = audio;

  const done = () => {
    if (currentAudio === audio) currentAudio = null;
    if (typeof onEnded === "function") onEnded();
  };

  audio.addEventListener("ended",done,{once:true});
  audio.addEventListener("error",done,{once:true});

  const p = audio.play();

  if (p && p.catch) {
    p.catch(() => {
      if (currentAudio === audio) currentAudio = null;
    });
  }
}

function clearTimers() {
  clearTimeout(lockTimer);
  clearInterval(audienceTimer);
  clearTimeout(playFadeTimer);

  if (playFadeFrame !== null) {
    cancelAnimationFrame(playFadeFrame);
  }

  lockTimer = null;
  audienceTimer = null;
  playFadeTimer = null;
  playFadeFrame = null;
}

function shouldUseSuspense() {
  return Boolean(game && LEVELS[game.levelIndex].amount > 500);
}

function invalidateQuestionAudio() {
  questionAudioToken += 1;
  suspenseAllowed = false;
}

function resetAudioElement(audio) {
  if (!audio) return;

  audio.pause();
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}
}

function stopSuspense() {
  suspenseAllowed = false;

  const audio = $("soundSuspense");

  audio.loop = false;
  resetAudioElement(audio);

  if (currentAudio === audio) {
    currentAudio = null;
  }
}

function stopQuestionBedHard() {
  suspenseAllowed = false;

  const playAudio = $("soundPlay");
  const suspenseAudio = $("soundSuspense");

  suspenseAudio.loop = false;

  resetAudioElement(playAudio);
  resetAudioElement(suspenseAudio);

  if (
    currentAudio === playAudio ||
    currentAudio === suspenseAudio
  ) {
    currentAudio = null;
  }
}

function fadeOutAudio(audio,durationMs = 1200) {
  return new Promise(resolve => {
    if (!audio || audio.paused) {
      if (audio) audio.volume = 1;
      resolve();
      return;
    }

    const startVolume =
      Number.isFinite(audio.volume)
        ? audio.volume
        : 1;

    const startedAt = performance.now();

    const step = now => {
      if (audio.paused) {
        audio.volume = 1;
        resolve();
        return;
      }

      const progress = Math.min(
        1,
        (now - startedAt) / durationMs
      );

      const smooth =
        progress * progress * (3 - 2 * progress);

      audio.volume = Math.max(
        0,
        startVolume * (1 - smooth)
      );

      if (progress >= 1) {
        audio.volume = 0;
        resolve();
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

async function fadeOutQuestionBed(durationMs = 1200) {
  suspenseAllowed = false;

  const playAudio = $("soundPlay");
  const suspenseAudio = $("soundSuspense");

  const active = [];

  if (!playAudio.paused) active.push(playAudio);
  if (!suspenseAudio.paused) active.push(suspenseAudio);

  if (active.length) {
    await Promise.all(
      active.map(audio => fadeOutAudio(audio,durationMs))
    );
  }

  stopQuestionBedHard();
}

function startSuspenseLoop(token) {
  if (
    token !== questionAudioToken ||
    !suspenseAllowed ||
    audioTransitioning ||
    !game ||
    game.finished ||
    game.locked ||
    game.resultResolved ||
    !shouldUseSuspense()
  ) {
    return;
  }

  const audio = $("soundSuspense");

  if (currentAudio && currentAudio !== audio) {
    stopAudio(currentAudio);
  }

  audio.pause();
  audio.loop = true;
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}

  currentAudio = audio;

  const p = audio.play();

  if (p && p.catch) {
    p.catch(() => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
    });
  }
}

function playQuestionAudio() {
  const token = ++questionAudioToken;
  const audio = $("soundPlay");
  const fadeMs = 1200;

  audioTransitioning = false;
  suspenseAllowed = true;
  stopQuestionBedHard();
  suspenseAllowed = true;

  clearTimeout(playFadeTimer);

  if (playFadeFrame !== null) {
    cancelAnimationFrame(playFadeFrame);
    playFadeFrame = null;
  }

  if (currentAudio && currentAudio !== audio) {
    stopAudio(currentAudio);
  }

  audio.pause();
  audio.volume = 1;

  try {
    audio.currentTime = 0;
  } catch {}

  currentAudio = audio;

  let finished = false;

  const cleanup = () => {
    clearTimeout(playFadeTimer);
    playFadeTimer = null;

    if (playFadeFrame !== null) {
      cancelAnimationFrame(playFadeFrame);
      playFadeFrame = null;
    }

    audio.removeEventListener("ended",handleEnded);
    audio.removeEventListener("error",handleError);
    audio.removeEventListener("loadedmetadata",scheduleFade);
    audio.removeEventListener("durationchange",scheduleFade);

    audio.volume = 1;

    if (currentAudio === audio) {
      currentAudio = null;
    }
  };

  const startSuspenseIfValid = () => {
    if (
      token === questionAudioToken &&
      suspenseAllowed &&
      !audioTransitioning &&
      game &&
      !game.locked &&
      !game.resultResolved &&
      !game.finished &&
      shouldUseSuspense()
    ) {
      startSuspenseLoop(token);
    }
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    cleanup();
    startSuspenseIfValid();
  };

  const runFade = () => {
    if (
      finished ||
      token !== questionAudioToken ||
      audio.paused
    ) {
      return;
    }

    const startedAt = performance.now();
    const startVolume = audio.volume;

    const step = now => {
      if (
        finished ||
        token !== questionAudioToken ||
        audio.paused
      ) {
        return;
      }

      const progress = Math.min(
        1,
        (now - startedAt) / fadeMs
      );

      const smooth =
        progress * progress * (3 - 2 * progress);

      audio.volume = Math.max(
        0,
        startVolume * (1 - smooth)
      );

      if (progress >= 1) {
        audio.pause();
        finish();
        return;
      }

      playFadeFrame = requestAnimationFrame(step);
    };

    playFadeFrame = requestAnimationFrame(step);
  };

  const scheduleFade = () => {
    clearTimeout(playFadeTimer);

    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    const remainingBeforeFadeMs =
      Math.max(
        0,
        audio.duration * 1000 - fadeMs
      );

    playFadeTimer = setTimeout(
      runFade,
      remainingBeforeFadeMs
    );
  };

  const handleEnded = () => {
    finish();
  };

  const handleError = () => {
    finish();
  };

  audio.addEventListener("ended",handleEnded,{once:true});
  audio.addEventListener("error",handleError,{once:true});
  audio.addEventListener("loadedmetadata",scheduleFade);
  audio.addEventListener("durationchange",scheduleFade);

  const p = audio.play();

  scheduleFade();

  if (p && p.catch) {
    p.catch(() => {
      cleanup();
    });
  }
}

function recentState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveRecent(state) {
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}

function pickQuestion(amount) {
  const pool = questionBank[String(amount)];
  const state = recentState();
  const key = "all:" + amount;
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;

  const recent = Array.isArray(state[key])
    ? state[key].filter(x => now - x.ts < twoHours)
    : [];

  const recentIds = new Set(recent.map(x => x.id));
  let available = pool.filter(q => !recentIds.has(q.id));

  if (!available.length) available = pool.slice();

  const selected = available[Math.floor(Math.random() * available.length)];

  recent.push({id:selected.id,ts:now});
  state[key] = recent.slice(-100);
  saveRecent(state);

  return selected;
}

function buildLadder() {
  $("ladder").innerHTML = "";
  LEVELS.forEach((level,index) => {
    const li = document.createElement("li");
    if (level.safe) li.classList.add("safe");
    li.innerHTML = `<span>${index + 1}</span><strong>${formatAmount(level.amount)}</strong>`;
    $("ladder").appendChild(li);
  });
}

function updateLadder() {
  document.querySelectorAll("#ladder li").forEach((li,index) => {
    li.classList.toggle("current",index === game.levelIndex && !game.finished);
  });
}

function resetQuestionUi() {
  $("continueWrap").classList.add("hidden");
  $("revealAnswerBtn").classList.remove("is-peeking");

  document.querySelectorAll(".answer").forEach(el => {
    el.classList.remove("host-peek");
  });
}

function canUseLifelines() {
  return Boolean(
    game &&
    game.currentQuestion &&
    !game.finished &&
    !game.locked &&
    !game.resultResolved &&
    !audioTransitioning
  );
}

function renderLifelines() {
  const map = [
    ["fiftyBtn","fifty"],
    ["phoneBtn","phone"],
    ["audienceBtn","audience"],
    ["changeBtn","change"]
  ];

  const available = canUseLifelines();

  map.forEach(([id,key]) => {
    const btn = $(id);
    const used = Boolean(game && game.lifelines[key]);

    btn.disabled = !available || used;
    btn.classList.toggle("used",used);
    btn.setAttribute("aria-pressed",used ? "true" : "false");
  });
}

function startGame() {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  if (currentAudio) stopAudio(currentAudio);

  game = {
    levelIndex:0,
    currentQuestion:null,
    locked:false,
    resultResolved:false,
    lockedAnswerIndex:null,
    lastResult:null,
    wonAmount:0,
    safeAmount:0,
    correctCount:0,
    finished:false,
    pendingFinishPayout:null,
    fiftyRemovedIndices:[],
    lifelines:{
      fifty:false,
      phone:false,
      audience:false,
      change:false
    }
  };

  buildLadder();
  showScreen("game");
  showReady(true);
  playExclusive("soundIntro");
}

function showReady(first,ending = false) {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  resetQuestionUi();
  $("questionStage").classList.add("hidden");
  $("preQuestionStage").classList.remove("hidden");

  const level = LEVELS[game.levelIndex];
  $("questionCounter").textContent = `${game.levelIndex + 1}/${LEVELS.length}`;

  if (first) {
    $("amountDisplay").textContent = formatAmount(level.amount);
    $("preQuestionTitle").textContent = "Έτοιμοι;";
    $("showQuestionBtn").textContent = "Ερώτηση";
    $("stopGameBtn").classList.add("hidden");
    $("triviaCard").classList.add("hidden");
  } else {
    const q = game.currentQuestion;
    const verification = q && q.verifiedBy ? ` · Έλεγχος: ${q.verifiedBy}` : "";
    const source = q && q.source ? `Πηγή: ${q.source}${verification}` : "";

    $("triviaText").textContent = q && q.trivia
      ? q.trivia
      : "Η σωστή απάντηση καταγράφηκε.";
    $("triviaSource").textContent = source;
    $("triviaCard").classList.remove("hidden");

    if (ending) {
      $("amountDisplay").textContent = formatAmount(game.pendingFinishPayout || 0);
      $("preQuestionTitle").textContent = game.lastResult === "wrong"
        ? "Τέλος παιχνιδιού"
        : "Ολοκληρώθηκε!";
      $("showQuestionBtn").textContent = "Αποτελέσματα";
      $("stopGameBtn").classList.add("hidden");
    } else {
      $("amountDisplay").textContent = formatAmount(level.amount);
      $("preQuestionTitle").textContent = `Επόμενη: ${formatAmount(level.amount)}`;
      $("showQuestionBtn").textContent = "Ερώτηση";
      $("stopGameBtn").classList.remove("hidden");
    }
  }

  updateLadder();
}

function showQuestion() {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  resetQuestionUi();

  game.locked = false;
  game.resultResolved = false;
  game.lockedAnswerIndex = null;
  game.fiftyRemovedIndices = [];

  const level = LEVELS[game.levelIndex];
  game.currentQuestion = pickQuestion(level.amount);

  $("preQuestionStage").classList.add("hidden");
  $("questionStage").classList.remove("hidden");
  $("questionCounter").textContent = `${game.levelIndex + 1}/${LEVELS.length}`;
  $("amountDisplay").textContent = formatAmount(level.amount);

  renderQuestion();
  renderLifelines();
  playQuestionAudio();
}

function renderQuestion() {
  const q = game.currentQuestion;
  $("questionText").textContent = q.question;
  $("answersGrid").innerHTML = "";

  q.options.forEach((option,index) => {
    const item = document.createElement("article");
    item.className = "answer";
    item.dataset.index = index;

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = LETTERS[index] + ":";

    const text = document.createElement("span");
    text.className = "answer-text";
    text.textContent = option;

    const lock = document.createElement("button");
    lock.className = "answer-lock-btn";
    lock.type = "button";
    lock.textContent = "Κλείδωσε";
    lock.addEventListener("click",() => lockAnswer(index));

    item.append(letter,text,lock);
    $("answersGrid").appendChild(item);
  });
}

async function lockAnswer(index) {
  if (game.locked || game.resultResolved) return;

  game.locked = true;
  game.lockedAnswerIndex = index;

  document.querySelectorAll(".answer-lock-btn").forEach(btn => {
    btn.disabled = true;
    btn.classList.add("is-hidden-after-lock");
  });

  renderLifelines();

  const selected = document.querySelector(
    `.answer[data-index="${index}"]`
  );

  if (selected) {
    selected.classList.add("is-locked-answer");
  }

  const level = LEVELS[game.levelIndex];

  invalidateQuestionAudio();
  audioTransitioning = true;

  await fadeOutQuestionBed(1200);

  audioTransitioning = false;
  playExclusive("soundLock");

  lockTimer = setTimeout(() => {
    stopAudio($("soundLock"));

    if (currentAudio === $("soundLock")) {
      currentAudio = null;
    }

    resolveAnswer();
  }, level.lockMs);
}

function resolveAnswer() {
  const selectedIndex = game.lockedAnswerIndex;
  const correctIndex = game.currentQuestion.correct;
  const correct = selectedIndex === correctIndex;

  game.resultResolved = true;
  game.lastResult = correct ? "correct" : "wrong";

  const selected = document.querySelector(
    `.answer[data-index="${selectedIndex}"]`
  );

  const right = document.querySelector(
    `.answer[data-index="${correctIndex}"]`
  );

  if (selected) {
    selected.classList.remove("is-locked-answer");
    selected.classList.add(
      correct
        ? "is-result-correct"
        : "is-result-wrong"
    );
  }

  if (!correct && right) {
    right.classList.add("is-result-correct");
  }

  const level = LEVELS[game.levelIndex];

  if (correct) {
    game.correctCount += 1;
    game.wonAmount = level.amount;

    if (level.safe) {
      game.safeAmount = level.amount;
    }

    playExclusive("soundRight");
  } else {
    playExclusive("soundWrong");
  }

  $("continueWrap").classList.remove("hidden");
}

function continueGame() {
  if (!game.resultResolved) return;

  if (game.lastResult === "wrong") {
    game.pendingFinishPayout = game.safeAmount;
    showReady(false,true);
    return;
  }

  if (game.levelIndex === LEVELS.length - 1) {
    game.pendingFinishPayout = game.wonAmount;
    showReady(false,true);
    return;
  }

  game.levelIndex += 1;
  showReady(false,false);
}

function handleStagePrimary() {
  if (game && game.pendingFinishPayout !== null) {
    const payout = game.pendingFinishPayout;
    game.pendingFinishPayout = null;
    finishGame(payout);
    return;
  }

  showQuestion();
}

function stopGame() {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  finishGame(game.wonAmount);
}

function finishGame(payout) {
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  game.finished = true;
  $("endTitle").textContent = formatAmount(payout);
  $("statsGrid").innerHTML = `
    <div class="stat"><span>Κέρδος</span><strong>${formatAmount(payout)}</strong></div>
    <div class="stat"><span>Σωστές</span><strong>${game.correctCount}</strong></div>
  `;
  showScreen("end");
}

function showCorrectPeek() {
  if (!game || !game.currentQuestion || game.resultResolved) return;

  const index = game.currentQuestion.correct;
  const answer = document.querySelector(
    `.answer[data-index="${index}"]`
  );

  if (answer) {
    answer.classList.add("host-peek");
  }

  $("revealAnswerBtn").classList.add("is-peeking");
}

function hideCorrectPeek() {
  document.querySelectorAll(".answer.host-peek").forEach(el => {
    el.classList.remove("host-peek");
  });

  $("revealAnswerBtn").classList.remove("is-peeking");
}

function useFifty() {
  if (!canUseLifelines() || game.lifelines.fifty) return;

  game.lifelines.fifty = true;

  const wrong = [0,1,2,3]
    .filter(i => i !== game.currentQuestion.correct)
    .sort(() => Math.random() - .5);

  game.fiftyRemovedIndices = wrong.slice(0,2);

  game.fiftyRemovedIndices.forEach(i => {
    const el = document.querySelector(`.answer[data-index="${i}"]`);
    if (el) el.classList.add("is-removed");
    const btn = el?.querySelector(".answer-lock-btn");
    if (btn) btn.disabled = true;
  });

  renderLifelines();
}

function usePhone() {
  if (!canUseLifelines() || game.lifelines.phone) return;

  game.lifelines.phone = true;
  renderLifelines();
}

function openModal(title,html) {
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = html;
  $("modalBackdrop").classList.remove("hidden");
}

function closeModal() {
  clearInterval(audienceTimer);
  audienceTimer = null;
  $("modalBackdrop").classList.add("hidden");
}

function makeAudienceTarget(active) {
  const q = game.currentQuestion;
  const correct = q.correct;
  const result = [0,0,0,0];

  let correctPct = active.length === 2
    ? 55 + Math.floor(Math.random()*26)
    : 38 + Math.floor(Math.random()*28);

  const others = active.filter(i => i !== correct);
  let remaining = 100 - correctPct;

  result[correct] = correctPct;

  others.forEach((idx,pos) => {
    if (pos === others.length - 1) {
      result[idx] = remaining;
    } else {
      const max = Math.max(1,remaining - (others.length-pos-1));
      const v = Math.floor(Math.random()*max);
      result[idx] = v;
      remaining -= v;
    }
  });

  const maxWrong = Math.max(...others.map(i => result[i]));
  if (maxWrong >= result[correct]) {
    const wi = others.find(i => result[i] === maxWrong);
    const shift = maxWrong - result[correct] + 1;
    result[wi] -= shift;
    result[correct] += shift;
  }

  return result;
}

function useAudience() {
  if (!canUseLifelines() || game.lifelines.audience) return;

  game.lifelines.audience = true;
  renderLifelines();

  const removed = new Set(game.fiftyRemovedIndices);
  const active = [0,1,2,3].filter(i => !removed.has(i));
  const target = makeAudienceTarget(active);
  const totalVotes = 1000;

  const counts = [0,0,0,0];
  const bag = [];

  active.forEach(i => {
    const n = Math.round(totalVotes * target[i] / 100);
    for (let x=0;x<n;x++) bag.push(i);
  });

  while (bag.length < totalVotes) bag.push(game.currentQuestion.correct);
  while (bag.length > totalVotes) bag.pop();

  for (let i=bag.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [bag[i],bag[j]] = [bag[j],bag[i]];
  }

  const rows = active.map(i => `
    <div class="audience-row" data-index="${i}">
      <span>${LETTERS[i]}</span>
      <div class="audience-track"><div class="audience-fill"></div></div>
      <strong class="audience-live-value">0%</strong>
    </div>
  `).join("");

  openModal("Κοινό",`
    <div class="audience-live-head">
      <span>Ψήφοι</span>
      <strong id="voteCount">0 / 1.000</strong>
    </div>
    ${rows}
  `);

  let cast = 0;

  audienceTimer = setInterval(() => {
    const batch = Math.min(totalVotes-cast,15+Math.floor(Math.random()*18));

    for (let x=0;x<batch;x++) {
      counts[bag[cast]] += 1;
      cast += 1;
    }

    active.forEach(i => {
      const row = document.querySelector(`.audience-row[data-index="${i}"]`);
      const pct = cast ? counts[i] / cast * 100 : 0;
      row.querySelector(".audience-fill").style.width = pct.toFixed(1) + "%";
      row.querySelector(".audience-live-value").textContent = pct.toFixed(1) + "%";
    });

    $("voteCount").textContent = `${cast.toLocaleString("el-GR")} / 1.000`;

    if (cast >= totalVotes) {
      clearInterval(audienceTimer);
      audienceTimer = null;
    }
  },80);
}

async function useChange() {
  if (!canUseLifelines() || game.lifelines.change) return;

  audioTransitioning = true;
  invalidateQuestionAudio();

  document.querySelectorAll(".answer-lock-btn").forEach(btn => {
    btn.disabled = true;
  });

  renderLifelines();

  await fadeOutQuestionBed(1200);

  game.lifelines.change = true;
  game.currentQuestion =
    pickQuestion(
      LEVELS[game.levelIndex].amount
    );

  game.fiftyRemovedIndices = [];
  game.locked = false;
  game.resultResolved = false;
  game.lockedAnswerIndex = null;

  resetQuestionUi();
  renderQuestion();

  audioTransitioning = false;
  renderLifelines();
  playQuestionAudio();
}

$("startBtn").addEventListener("click",startGame);
$("showQuestionBtn").addEventListener("click",handleStagePrimary);
$("stopGameBtn").addEventListener("click",stopGame);
$("continueBtn").addEventListener("click",continueGame);
$("revealAnswerBtn").addEventListener("mouseenter",showCorrectPeek);
$("revealAnswerBtn").addEventListener("mouseleave",hideCorrectPeek);
$("revealAnswerBtn").addEventListener("pointerdown",showCorrectPeek);
$("revealAnswerBtn").addEventListener("pointerup",hideCorrectPeek);
$("revealAnswerBtn").addEventListener("pointercancel",hideCorrectPeek);





$("lifelines").addEventListener("click",event => {
  const btn = event.target.closest(".lifeline-btn");

  if (!btn || !$("lifelines").contains(btn) || btn.disabled) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const actions = {
    fifty:useFifty,
    phone:usePhone,
    audience:useAudience,
    change:useChange
  };

  const action = actions[btn.dataset.lifeline];

  if (action) {
    action();
  }
});

$("modalCloseBtn").addEventListener("click",closeModal);
$("modalBackdrop").addEventListener("click",e => {
  if (e.target === $("modalBackdrop")) closeModal();
});
$("newGameBtn").addEventListener("click",() => {
  clearTimers();
  invalidateQuestionAudio();
  audioTransitioning = false;
  stopQuestionBedHard();
  if (currentAudio) stopAudio(currentAudio);
  game = null;
  showScreen("setup");
});


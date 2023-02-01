import classes from './HomePage.module.css'

const HomePage = () => {
 

    return (
        <div className={classes.HomePageWrapper}>
            <div className={classes.titleWrapper}>
                <h1>Antrenmanlarını ve öğünlerini</h1>
                <h1>kaydet,</h1>
                <h1>takip et,</h1>
                <h1>ilerle.</h1>
            </div>
            
            <p>Takip etmediğin şeyi geliştiremezsin. Spor hayatının takibini kolaylaştıracak FitTracker'ı kişisel amaçların için kullanmaya başla.
                
            <br></br><br></br>
            Spor salonu sahibiysen; üyelerini takip etmek, yemek planı/antrenmanlarını düzenlemek veya atamak için premium üyemiz ol.</p>
        </div>
    )
}

export default HomePage
CREATE TABLE clientinformationaccount (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  name TEXT
);

CREATE TABLE clientinformationhospital (
  id BIGINT,
  name TEXT 
);

ALTER TABLE clientinformationhospital
ADD "(hospital)Abrazo Arizona Heart Hospital" TEXT,ADD "(hospital)Abrazo Arrowhead Campus" TEXT,ADD "(hospital)Abrazo Cave Creek Hospital" TEXT,ADD "(hospital)Abrazo Central Campus" TEXT,ADD "(hospital)Abrazo Scottsdale Campus" TEXT,ADD "(hospital)Abrazo Surprise Hospital" TEXT,ADD "(hospital)Abrazo West Campus" TEXT,ADD "(hospital)Agave Ridge Behavioral Hospital" TEXT,ADD "(hospital)Arizona Specialty Hospital" TEXT,ADD "(hospital)Arizona Spine and Joint Hospital" TEXT,ADD "(hospital)Banner - University Medical Center Tucson" TEXT,ADD "(hospital)Banner - University Medical Center Phoenix" TEXT,ADD "(hospital)Banner - University Medical Center South" TEXT,ADD "(hospital)Banner Baywood Medical Center" TEXT,ADD "(hospital)Banner Boswell Medical Center" TEXT,ADD "(hospital)Banner Casa Grande Medical Center" TEXT,ADD "(hospital)Banner Del E. Webb Medical Center" TEXT,ADD "(hospital)Banner Desert Medical Center" TEXT,ADD "(hospital)Banner Estrella Medical Center" TEXT,ADD "(hospital)Banner Gateway Medical Center" TEXT,ADD "(hospital)Banner Goldfield Medical Center" TEXT,ADD "(hospital)Banner Heart Hospital" TEXT,ADD "(hospital)Banner Ironwood Medical Center" TEXT,ADD "(hospital)Banner Ocotillo Medical Center" TEXT,ADD "(hospital)Banner Rehabilitation Hospital East" TEXT,ADD "(hospital)Banner Thunderbird Medical Center" TEXT,ADD "(hospital)Canyon Vista Medical Center" TEXT,ADD "(hospital)Carl T. Hayden VAMC" TEXT,ADD "(hospital)Carondelet Heart & Vascular Institute" TEXT,ADD "(hospital)Carondelet Marana Hospital" TEXT,ADD "(hospital)Chandler Regional Medical Center" TEXT,ADD "(hospital)Chinle Comprehensive Health Care Facility" TEXT,ADD "(hospital)City of Hope Phoenix" TEXT,ADD "(hospital)Dignity Health - Arizona General Hospital Laveen" TEXT,ADD "(hospital)Dignity Health - Arizona General Hospital Mesa" TEXT,ADD "(hospital)Dignity Health Arizona Specialty Hospital" TEXT,ADD "(hospital)East Valley ER & Hospital" TEXT,ADD "(hospital)Exceptional Community Hospital - Maricopa" TEXT,ADD "(hospital)Exceptional Community Hospital - Yuma" TEXT,ADD "(hospital)Flagstaff Medical Center" TEXT,ADD "(hospital)Florence Hospital" TEXT,ADD "(hospital)Havasu Regional Medical Center" TEXT,ADD "(hospital)HonorHealth Deer Valley Medical Center" TEXT,ADD "(hospital)HonorHealth John C. Lincoln Medical Center" TEXT,ADD "(hospital)HonorHealth Scottsdale Osborn Medical Center" TEXT,ADD "(hospital)HonorHealth Scottsdale Shea Medical Center" TEXT,ADD "(hospital)HonorHealth Scottsdale Thompson Peak Medical Center" TEXT,ADD "(hospital)HonorHealth Sonoran Crossing Medical Center" TEXT,ADD "(hospital)Kingman Regional Medical Center" TEXT,ADD "(hospital)Mayo Clinic Hospital, Phoenix Arizona" TEXT,ADD "(hospital)Mercy Gilbert Medical Center" TEXT,ADD "(hospital)Mountain Vista Medical Center" TEXT,ADD "(hospital)Northern Arizona VA Health Care System" TEXT,ADD "(hospital)Northwest Medical Center" TEXT,ADD "(hospital)Northwest Medical Center Sahuarita" TEXT,ADD "(hospital)Oro Valley Hospital" TEXT,ADD "(hospital)Phoenix ER & Medical Hospital" TEXT,ADD "(hospital)Phoenix Indian Medical Center" TEXT,ADD "(hospital)Saint Joseph's Hospital" TEXT,ADD "(hospital)Saint Joseph's Westgate Medical Center" TEXT,ADD "(hospital)Saint Mary's Hospital" TEXT,ADD "(hospital)Sells Indian Hospital" TEXT,ADD "(hospital)Southern Arizona VA Health Care System" TEXT,ADD "(hospital)St. Joseph's Hospital and Medical Center" TEXT,ADD "(hospital)Steward Mesa Hospital" TEXT,ADD "(hospital)Summit Healthcare Regional Medical Center" TEXT,ADD "(hospital)Tempe Saint Luke's Hospital" TEXT,ADD "(hospital)The CORE Institute Specialty Hospital" TEXT,ADD "(hospital)Tsehootsooi Medical Center" TEXT,ADD "(hospital)Tuba City Regional Health Care" TEXT,ADD "(hospital)Tucson ER & Hospital" TEXT,ADD "(hospital)Tucson Medical Center (TMC)" TEXT,ADD "(hospital)Tucson Medical Center (TMC) Rincon" TEXT,ADD "(hospital)Valley View Medical Center" TEXT,ADD "(hospital)Valleywise Behavioral Health Center-Maryvale" TEXT,ADD "(hospital)Valleywise Health Medical Center" TEXT,ADD "(hospital)Verde Valley Medical Center" TEXT,ADD "(hospital)Verde Valley Medical Center - Sedona Campus" TEXT,ADD "(hospital)Western Arizona Regional Medical Center" TEXT,ADD "(hospital)Whiteriver Indian Hospital" TEXT,ADD "(hospital)Yavapai Regional Medical Center - East" TEXT,ADD "(hospital)Yavapai Regional Medical Center - West" TEXT,ADD "(hospital)Yuma Regional Medical Center" TEXT;

/*
UPDATE clientinformationhospital
SET "(hospital)Abrazo Arizona Heart Hospital" = 'EXCELLENT'
WHERE id = 1;
*/

/*https://postgresql-anonymizer.readthedocs.io/en/stable/ 
*/

CREATE TABLE clientinformationhealthinsurance (
   id BIGINT,
   name TEXT,
   "(health insurance)Blue Cross Blue Shield Association" TEXT,
   "(health insurance)Cigna" TEXT,
   "(health insurance)UnitedHealthcare" TEXT,
   "(health insurance)Aetna" TEXT,
   "(health insurance)Health Net of Arizona, Inc." TEXT,
   "(health insurance)Humana" TEXT,
   "(health insurance)Medica" TEXT,
   "(health insurance)Oscar" TEXT,
   "(health insurance)Ambetter" TEXT,
   "(health insurance)Bright Health" TEXT
   
);


/*
TRUNCATE TABLE clientinformationaccount;
TRUNCATE TABLE clientinformationhealthinsurance;
TRUNCATE TABLE clientinformationhospital;
*/
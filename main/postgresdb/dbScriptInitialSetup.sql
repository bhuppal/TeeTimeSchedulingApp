CREATE TABLE  facility (
    facility_id serial  PRIMARY KEY,
    name character varying(50),     
    address character varying(100),     
    phonenumber character varying(50),
    holes INT NOT NULL,
    par INT NOT NULL,
    length INT NOT NULL, 
    rating INT NOT NULL,
    slope INT NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO facility( name, address, phonenumber, holes, par, length, rating, slope)
VALUES
('Reston National Golf Course', '11875 Sunrise Valley Dr, Reston, VA 20191', '(703) 620-9333', 18, 71, 6855, 72.8, 132),
('Eagle Harbor Golf Club', '2217 Eagle Harbor Pkwy, Fleming Island', 'FL 32003 (904) 269-9300', 18, 72, 6840, 72.1, 131),
('Sharp Park Golf Course', '1 Sharp Park Rd, Pacifica, CA 94044', '(650) 359-3380', 18, 72, 6494, 71.9, 127),
('Waikoloa Beach Resort Golf', '600 Waikōloa Beach Dr, Waikoloa Village, HI 96738', '(808) 886-7888', 18, 72, 6814, 72.1, 122),
('South Shore Golf Club', '200 Huguenot Ave, Staten Island, NY 10312', '(718) 984-0101', 18, 72, 5815, 67.8, 117),
('Emerald Greens Golf Club', '597 S Clinton St, Denver, CO 80247', '(303) 366-3133', 18, 70, 6026, 70.2, 124);

CREATE TABLE TeeTimeBooking (
    teeTimeBooking_id serial  PRIMARY KEY,
    facility_id INT NOT NULL,
    pgaMemberId character varying(50),     
    firstName character varying(100),     
    lastName character varying(50),
    teeTimeDate DATE NOT NULL,
    teeTimeTime TIME NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (facility_id)
      REFERENCES facility (facility_id)
);


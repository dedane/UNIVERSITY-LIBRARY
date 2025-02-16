interface Book {
     id: number,
     title: number,
     author: string,
     genre: string,
     rating: number,
     total_copies: number, 
     available_copies: number,
     description: string,
     color: string,
     coverUrl: string,
     video: string,
     summary: string,
     isLoanedBook: Boolean
}
interface authCredentials {
     fullName: string;
     email: string;
     password: string;
     universityId: number;
     universityCard: number;
}
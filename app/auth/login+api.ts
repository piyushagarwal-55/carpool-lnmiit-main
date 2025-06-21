export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email and password are required' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate LNMIIT email format (except for demo accounts)
    const emailRegex = /^\d{2}U[A-Z]{2}\d{3}@lnmiit\.ac\.in$/;
    const isDemoEmail = email === 'demo@lnmiit.ac.in';
    
    if (!isDemoEmail && !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid LNMIIT email format. Example: 21UCS045@lnmiit.ac.in' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Demo credentials for testing
    const demoUsers = [
      {
        email: 'demo@lnmiit.ac.in',
        password: 'demo123',
        user: {
          id: 'demo-1',
          email: 'demo@lnmiit.ac.in',
          name: 'Demo User',
          role: 'passenger' as const,
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          contactNumber: '+91 99999 00000',
          branch: 'Demo',
          year: 'Demo',
          rating: 4.5,
          isVerified: true,
          emergencyContacts: [
            {
              id: 'ec-1',
              name: 'Emergency Contact',
              phone: '+91 99887 76655',
              relation: 'Parent',
              userId: 'demo-1'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          ridesCompleted: 25
        }
      },
      {
        email: '21UCS045@lnmiit.ac.in',
        password: 'student123',
        user: {
          id: 'student-1',
          email: '21UCS045@lnmiit.ac.in',
          name: 'Arjun Sharma',
          role: 'passenger' as const,
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
          contactNumber: '+91 98765 43210',
          branch: 'Computer Science',
          year: '3rd Year',
          rating: 4.7,
          isVerified: true,
          emergencyContacts: [
            {
              id: 'ec-2',
              name: 'Rajesh Sharma',
              phone: '+91 98765 43211',
              relation: 'Father',
              userId: 'student-1'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          ridesCompleted: 87
        }
      },
      {
        email: '21UME023@lnmiit.ac.in',
        password: 'driver123',
        user: {
          id: 'driver-1',
          email: '21UME023@lnmiit.ac.in',
          name: 'Priya Gupta',
          role: 'driver' as const,
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
          contactNumber: '+91 87654 32109',
          branch: 'Mechanical Engineering',
          year: '4th Year',
          rating: 4.8,
          isVerified: true,
          emergencyContacts: [
            {
              id: 'ec-3',
              name: 'Suresh Gupta',
              phone: '+91 87654 32110',
              relation: 'Father',
              userId: 'driver-1'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          ridesCompleted: 125
        }
      }
    ];

    // Find user by email and verify password
    const foundUser = demoUsers.find(user => user.email === email);
    
    if (!foundUser || foundUser.password !== password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid email or password' 
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate JWT token (simplified for demo)
    const token = `jwt_${foundUser.user.id}_${Date.now()}`;
    const refreshToken = `refresh_${foundUser.user.id}_${Date.now()}`;

    // Return successful login response
    return new Response(
      JSON.stringify({
        success: true,
        user: foundUser.user,
        token,
        refreshToken,
        message: 'Login successful'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
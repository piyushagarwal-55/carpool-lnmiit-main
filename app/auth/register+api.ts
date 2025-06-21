export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, role, contactNumber, branch, year } = body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email, password, name, and role are required' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate LNMIIT email format
    const emailRegex = /^\d{2}U[A-Z]{2}\d{3}@lnmiit\.ac\.in$/;
    if (!emailRegex.test(email)) {
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

    // Validate password length
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Password must be at least 6 characters long' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate role
    if (!['driver', 'passenger'].includes(role)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Role must be either "driver" or "passenger"' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if user already exists (in a real app, this would check the database)
    const existingEmails = [
      'demo@lnmiit.ac.in',
      '21UCS045@lnmiit.ac.in',
      '21UME023@lnmiit.ac.in'
    ];

    if (existingEmails.includes(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'User with this email already exists' 
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: role as 'driver' | 'passenger',
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      contactNumber: contactNumber || '',
      branch: branch || '',
      year: year || '',
      rating: 5.0,
      isVerified: false,
      emergencyContacts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ridesCompleted: 0
    };

    // Generate JWT token (simplified for demo)
    const token = `jwt_${newUser.id}_${Date.now()}`;
    const refreshToken = `refresh_${newUser.id}_${Date.now()}`;

    // Return successful registration response
    return new Response(
      JSON.stringify({
        success: true,
        user: newUser,
        token,
        refreshToken,
        message: 'Registration successful'
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Registration error:', error);
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
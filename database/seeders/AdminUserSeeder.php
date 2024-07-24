<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        if (!User::where('email', 'admin@booking.com')->exists()) {
            $admin = User::create([
                'name' => 'Admin User',
                'email' => 'admin@booking.com',
                'password' => bcrypt('password'),
            ]);

            $admin->assignRole($adminRole);
        }
    }
}

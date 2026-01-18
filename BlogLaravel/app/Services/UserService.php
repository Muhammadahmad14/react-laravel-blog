<?php

namespace App\Services;

class UserService
{
    /**
     * Create a new class instance.
     */
   public function getFollowStatus($authUser, $profileUser)
    {
        $authFollowsProfile = $authUser->following()
            ->where('following_id', $profileUser->id)
            ->exists();

        $profileFollowsAuth = $profileUser->following()
            ->where('following_id', $authUser->id)
            ->exists();

        if ($authFollowsProfile && $profileFollowsAuth) {
            return 'Friends';
        } elseif ($authFollowsProfile) {
            return 'Following';
        } elseif ($profileFollowsAuth) {
            return 'Follow Back';
        }

        return 'Follow';
    }

}
